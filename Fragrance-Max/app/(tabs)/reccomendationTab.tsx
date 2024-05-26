import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, Modal, TouchableOpacity } from 'react-native';

interface Recommendation {
  image: string;
  description: string;
  // Add other properties if needed
}

const RecommendationTab = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null);

  // Fetch recommendations from your backend server
  useEffect(() => {
    fetch('http://18.216.32.79:8000/api/recommendations/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Your data here
      }),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Failed to post data:', error));
  }, []);

  const handleRecommendationPress = (recommendation: Recommendation) => {
    setSelectedRecommendation(recommendation);
  };

  const handleCloseModal = () => {
    setSelectedRecommendation(null);
  };

  return (
    <View>
      <ScrollView>
        {recommendations.map((recommendation, index) => (
          <TouchableOpacity key={index} onPress={() => handleRecommendationPress(recommendation)}>

          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedRecommendation && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={!!selectedRecommendation}
          onRequestClose={handleCloseModal}
        >
          <View>
            <TouchableOpacity onPress={handleCloseModal}>
              <Text>X</Text>
            </TouchableOpacity>
            <Text>{selectedRecommendation.description}</Text>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default RecommendationTab;