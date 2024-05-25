import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const questions = [
  {
    question: 'What is your gender?',
    options: ['Male', 'Female', 'Non-binary', 'Prefer not to say'],
  },
  {
    question: 'How would you describe your scent preference?',
    options: ['Fresh (citrus and oceanic)', 'Floral (roses, jasmine, lilies)', 'Woody (pine, cedar, sandalwood)', 'Oriental (spices, amber, vanilla)', 'Green (grass, leaves, tea)'],
  },
  {
    question: 'What is the primary occasion for which you are selecting a fragrance?',
    options: ['Everyday use', 'Work environment', 'Special occasions', 'Night out', 'Relaxing at home'],
  },
  {
    question: 'Which season do you want this fragrance for?',
    options: ['Spring', 'Summer', 'Fall', 'Winter', 'All-year round'],
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
  const [answers, setAnswers] = useState<string[]>([]);

  const handleOptionPress = (options: string) => {
    setAnswers((prevAnswers) => [...prevAnswers, options]);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };
  if (currentQuestionIndex >= questions.length) {
    return (
      <View style={styles.container}>
        /*needs page switing logic and saving to database later*/
        <Text>Thank you for completing the Personalized Quiz, your reccomendations will be diplay shortly</Text>
        /*database logic here*/
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/Logo-fragrance.jpg')} style={styles.logo} />
      <Text style={styles.question}>{questions[currentQuestionIndex].question}</Text>
      {questions[currentQuestionIndex].options.map((option) => (
        <TouchableOpacity key={option} style={styles.option} onPress={() => handleOptionPress(option)}>
          <Text>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
});

export default QuizPage;