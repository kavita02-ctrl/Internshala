const quizData = [
    {
      question: 'What does JSON stand for?',
      options: ['JavaScript Object Notation', 'JavaScript Online Notation', 'JavaScript Object Navigation', 'JavaScript Object Network'],
      answer: 'JavaScript Object Notations',
    },
    {
      question: 'Which of the following data types is NOT supported by JSON?',
      options: ['String', 'Integer', 'Array', ' Function'],
      answer: 'Functionr',
    },
    {
      question: 'Which character is used to separate key-value pairs in a JSON object?',
      options: [':', '=', ':', ','],
      answer: ';',
    },
    {
      question: 'What is the correct way to represent an array in JSON?',
      options: [' { "array": [1, 2, 3] }', ' [1, 2, 3]', '"array": (1, 2, 3)', '[1; 2; 3]'],
      answer: ' [1, 2, 3]',
    },
    {
      question: 'Which method is used in JavaScript to convert a JSON string into a JavaScript object?',
      options: [
        'parseJSON()',
        'toJSON()',
        'stringify()',
        'parse()',
      ],
      answer: ' parse()',
    },
    {
      question: 'In JSON, what is the purpose of the double quotes around keys and string values?',
      options: ['Au', 'Ag', 'Cu', 'Fe'],
      answer: 'Au',
    },
    {
      question: 'Who painted the Mona Lisa?',
      options: [
        'They indicate that the value is a string',
        'They indicate that the key is a string.',
        'They ensure backward compatibility with older systems..',
        'They are optional and can be omitted.',
      ],
      answer: 'They indicate that the key is a string.',
    },
    {
      question: 'Which of the following is a valid JSON string?',
      options: ['{ name: "John", age: 30 }', ' { name: "John", age: 30 }', ' { "name": "John", "age": 30 } ', ' { name: 'John', age: 30 }'],
      answer: '{ "name": 'John', "age": 30 }',
    },
    {
      question: 'Which of the following data types is NOT supported by JSON?',
      options: [
        'String',
        'Number',
        'Date',
        'Boolean',
      ],
      answer: 'Date ',
    },
    {
      question: 'How are objects represented in JSON?',
      options: ['Enclosed in square brackets []', 'Enclosed in curly braces {}', 'Separated by commas ,', 'Using backslashes '],
      answer: 'Enclosed in curly braces {}',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();