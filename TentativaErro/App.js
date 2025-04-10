import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const App = () => {
  const [randomNumber, setRandomNumber] = useState(0);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState('Tente adivinhar o número entre 1 e 100');
  const [gameHistory, setGameHistory] = useState([]);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const newNumber = Math.floor(Math.random() * 100) + 1;
    setRandomNumber(newNumber);
    setGuess('');
    setAttempts(0);
    setMessage('Tente adivinhar o número entre 1 e 100');
  };

  const handleGuess = () => {
    // Verifica se já atingiu o limite de tentativas
    if (attempts >= 5) {
      Alert.alert(
        'Fim de jogo',
        `Suas tentativas acabaram! O número era ${randomNumber}.`,
        [{ text: 'OK', onPress: startNewGame }]
      );
      return;
    }

    const guessedNumber = parseInt(guess, 10);
    
    if (isNaN(guessedNumber)) {
      setMessage('Por favor, digite um número válido!');
      return;
    }
    
    if (guessedNumber < 1 || guessedNumber > 100) {
      setMessage('O número deve estar entre 1 e 100!');
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (guessedNumber === randomNumber) {
      const historyEntry = `Você acertou em ${newAttempts} tentativas! Número: ${randomNumber}`;
      setGameHistory(prev => [...prev, historyEntry]);
      
      Alert.alert(
        'Parabéns!',
        `Você acertou o número ${randomNumber} em ${newAttempts} tentativas!`,
        [{ text: 'OK', onPress: startNewGame }]
      );
    } else {
      const hint = guessedNumber < randomNumber ? 'maior' : 'menor';
      const remaining = 5 - newAttempts;
      setMessage(`Errado! O número é ${hint} que ${guessedNumber}. Tentativas restantes: ${remaining}`);
      setGuess('');
      
      if (remaining === 0) {
        const historyEntry = `Você perdeu! O número era ${randomNumber}`;
        setGameHistory(prev => [...prev, historyEntry]);
        
        Alert.alert(
          'Fim de jogo',
          `Suas tentativas acabaram! O número era ${randomNumber}.`,
          [{ text: 'OK', onPress: startNewGame }]
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogo de Adivinhação</Text>
      <Text style={styles.message}>{message}</Text>
      
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={guess}
        onChangeText={setGuess}
        placeholder="Digite seu palpite"
      />
      
      <Button
        title="Enviar palpite"
        onPress={handleGuess}
        disabled={attempts >= 5} // Desabilita o botão após 5 tentativas
      />
      
      <Text style={styles.attempts}>Tentativas: {attempts}/5</Text>
      
      <View style={styles.history}>
        <Text style={styles.historyTitle}>Histórico:</Text>
        {gameHistory.slice(-5).map((entry, index) => ( // Mostra apenas os últimos 5 resultados
          <Text key={index} style={styles.historyEntry}>{entry}</Text>
        ))}
      </View>
    </View>
  );
};

// Mantenha os estilos do código anterior