import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

export default function App() {
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(5);
  const [message, setMessage] = useState('Tente adivinhar o número entre 1 e 100');
  const [gameHistory, setGameHistory] = useState([]);

  // Gera um número aleatório entre 1 e 100
  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  // Reinicia o jogo com um novo número
  function resetGame() {
    setRandomNumber(generateRandomNumber());
    setAttempts(5);
    setGuess('');
    setMessage('Novo jogo! Tente adivinhar o número entre 1 e 100');
    setGameHistory([]);
  }

  // Verifica o palpite do jogador
  function checkGuess() {
    const guessedNumber = parseInt(guess);
    
    if (isNaN(guessedNumber) || guessedNumber < 1 || guessedNumber > 100) {
      Alert.alert('Erro', 'Por favor, digite um número válido entre 1 e 100');
      return;
    }

    const newHistory = [...gameHistory, guessedNumber];
    setGameHistory(newHistory);

    if (guessedNumber === randomNumber) {
      Alert.alert('Parabéns!', `Você acertou o número ${randomNumber}!`);
      resetGame();
    } else {
      const remainingAttempts = attempts - 1;
      setAttempts(remainingAttempts);

      if (remainingAttempts === 0) {
        Alert.alert('Fim de jogo', `Suas tentativas acabaram! O número era ${randomNumber}.`);
        resetGame();
      } else {
        setMessage(
          `O número é ${guessedNumber < randomNumber ? 'maior' : 'menor'} que ${guessedNumber}. ` +
          `Você tem ${remainingAttempts} tentativa(s) restante(s).`
        );
        setGuess('');
      }
    }
  }

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
        onPress={checkGuess}
      />
      
      <Text style={styles.attempts}>Tentativas restantes: {attempts}</Text>
      
      <Text style={styles.historyTitle}>Histórico:</Text>
      {gameHistory.map((item, index) => (
        <Text key={index} style={styles.historyItem}>
          Tentativa {index + 1}: {item} - {item < randomNumber ? 'Baixo' : 'Alto'}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#cfe8bc',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#22300B',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  attempts: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#22300B',
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
  },
  historyItem: {
    fontSize: 14,
    marginBottom: 5,
  },
});