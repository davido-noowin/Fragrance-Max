import React, { useState, useEffect } from 'react';
import {useColorScheme, View, Text, TouchableOpacity, StyleSheet, Image, ScrollView} from 'react-native';


const questions = [
  {
    question: 'What is your gender?',
    options: ['Male', 'Female', 'Non-binary', 'Prefer not to say'],
  },
  {
    question: 'How would you describe your scent preference?',
    options: ['Fresh (citrus and oceanic)', 
              'Floral (roses, jasmine, lilies)', 
              'Woody (pine, cedar, sandalwood)', 
              'Oriental (powdery, amber, vanilla)', 
              'Green (grass, leaves, tea)',
              'Spicy (smoky, peppery, cinnamon)' ,
              'Warm (coffee, nutty, chocolately, caramel)'],
  },
  {
    question: 'What is the primary occasion for which you are selecting a fragrance?',
    options: ['Casual', 'Formal', 'General', 'Office'],
  },
  {
    question: 'Which season do you want this fragrance for?',
    options: ['Spring', 'Summer', 'Fall', 'Winter', 'Year-round'],
  },
  {
    question: 'What is your age group?',
    options: ['Under 20', '20-30', '30-40', '40-50', '50+'],
  },
  {
    question: 'How intense do you like your fragrance to be?',
    options: ['Light and subtle', 'Moderate', 'Strong', 'Very strong'],
  },
];

const QuizPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [answers, setAnswers] = useState({
    gender : '',
    scent_pref : '',
    occasion : '',
    season : '',
    age_group : '',
    intensity : '',
  });
  const colorScheme = useColorScheme();
  const textColor = colorScheme === 'dark' ? 'white' : 'black';
  const handleOptionPress = (options: string) => {
    setAnswers((prevAnswers) => {
      const key = Object.keys(prevAnswers)[currentQuestionIndex];
      return { ...prevAnswers, [key] : options };
    });
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleSurveyCompletion = () => {
   //subject to change
   console.log(answers);
    fetch('http://192.168.0.28:8000/api/recommendations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( answers ),
    })
      .then(response => response.json())
      .then(data => setRecommendations(data))
      .catch(error => console.error('a way to catch non posting error', error));
  };
  

  useEffect(() => {
    if (currentQuestionIndex >= questions.length) {
      setIsCompleted(true);
      handleSurveyCompletion();
    }
  }, [currentQuestionIndex, questions.length]);

  if (isCompleted && recommendations.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={{ color: textColor }}>Thank you for completing the Personalized Quiz. Your recommendations will be displayed shortly.</Text>
      </View>
    );
  }

  if (recommendations.length > 0) {
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={[styles.question, { color: textColor }]}>Your Recommendations:</Text>
          {recommendations.map((recommendation, index) => (
            <View key={index} style={styles.recommendation}>
              <Text style={{ color: textColor, fontWeight: 'bold' }}>{recommendation.brand}</Text>
              <Text style={{ color: textColor }}>{recommendation.fragrance}</Text>
              <Text style={{ color: textColor }}>{recommendation.description}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/Logo-fragrance.jpg')} style={styles.logo} />
      {currentQuestionIndex < questions.length && (
        <>
          <Text style={[styles.question, { color: textColor }]}>{questions[currentQuestionIndex].question}</Text>
          {questions[currentQuestionIndex].options.map((option) => (
            <TouchableOpacity key={option} style={styles.option} onPress={() => handleOptionPress(option)}>
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  recommendationsContainer: {
    marginTop: 50, // Add margin to move the recommendations down
    padding: 16,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 16,
  },
  question: {
    fontSize: 18,
    marginBottom: 16,
  },
  option: {
    padding: 16,
    backgroundColor: '#ddd',
    marginBottom: 16,
  },
  recommendation: {
    marginBottom: 16,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default QuizPage;