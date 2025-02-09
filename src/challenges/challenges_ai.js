const ai_challenges = [
  {
    title: "Machine Learning Definition",
    description: "What does ML stand for?",
    type: "select",
    options: [
      "Select Correct Answer",
      "Machine Logic",
      "Machine Learning",
      "Mathematical Linguistics",
    ],
    solution: "Machine Learning",
  },
  {
    title: "First Perceptron",
    description: "In what year was the first perceptron developed?",
    type: "select",
    options: ["Select Correct Answer", "1950", "1957", "1967"],
    solution: "1957",
  },
  {
    title: "Types of ML",
    description: "Which of the following is NOT a type of machine learning?",
    type: "select",
    options: [
      "Select Correct Answer",
      "Supervised",
      "Unsupervised",
      "Iterative",
    ],
    solution: "Iterative",
  },
  {
    title: "ML Workflow",
    description: "Which step comes first in the ML workflow?",
    type: "select",
    options: [
      "Select Correct Answer",
      "Data Collection",
      "Model Training",
      "Prediction",
    ],
    solution: "Data Collection",
  },
  {
    title: "Artificial Intelligence",
    description: "Which of these fields is the broadest?",
    type: "select",
    options: [
      "Select Correct Answer",
      "Deep Learning",
      "Machine Learning",
      "Artificial Intelligence",
    ],
    solution: "Artificial Intelligence",
  },
  {
    title: "Deep Learning",
    description:
      "Which neural network type is commonly used for image recognition?",
    type: "select",
    options: [
      "Select Correct Answer",
      "Recurrent Neural Network",
      "Convolutional Neural Network",
      "Bayesian Network",
    ],
    solution: "Convolutional Neural Network",
  },
  {
    title: "Turing Test",
    description:
      "Which test was designed to evaluate a machine’s ability to mimic human intelligence?",
    type: "select",
    options: [
      "Select Correct Answer",
      "Alan Test",
      "Turing Test",
      "Neural Test",
    ],
    solution: "Turing Test",
  },
  {
    title: "Historic AI Milestone",
    description: "Who did IBM’s Deep Blue defeat in chess in 1997?",
    type: "select",
    options: [
      "Select Correct Answer",
      "Bobby Fischer",
      "Garry Kasparov",
      "Magnus Carlsen",
    ],
    solution: "Garry Kasparov",
  },
  {
    title: "AlphaGo",
    description:
      "In 2016, which AI system defeated a human champion in the game of Go?",
    type: "select",
    options: ["Select Correct Answer", "DeepMind", "AlphaGo", "Watson"],
    solution: "AlphaGo",
  },
  {
    title: "Recent AI Advances",
    description: "Which AI model was released in 2022 for text generation?",
    type: "select",
    options: ["Select Correct Answer", "BERT", "GPT-3", "ChatGPT"],
    solution: "ChatGPT",
  },
  {
    title: "Neural Networks",
    description: "What does MLP stand for?",
    type: "select",
    options: [
      "Select Correct Answer",
      "Multilayer Processing",
      "Multilayer Perceptron",
      "Machine Learning Pipeline",
    ],
    solution: "Multilayer Perceptron",
  },
  {
    title: "CNN Concept",
    description: "What is the primary function of convolution in a CNN?",
    type: "select",
    options: [
      "Select Correct Answer",
      "Feature extraction",
      "Data augmentation",
      "Backpropagation",
    ],
    solution: "Feature extraction",
  },
  {
    title: "Handwritten Recognition",
    description:
      "Which dataset is commonly used for handwritten digit classification?",
    type: "select",
    options: ["Select Correct Answer", "MNIST", "ImageNet", "COCO"],
    solution: "MNIST",
  },
  {
    title: "Transfer Learning",
    description: "Which model is commonly used for transfer learning?",
    type: "select",
    options: ["Select Correct Answer", "ResNet", "LSTM", "GAN"],
    solution: "ResNet",
  },
  {
    title: "Predictive Models",
    description: "What is the purpose of a predictive model?",
    type: "select",
    options: [
      "Select Correct Answer",
      "To store data",
      "To generate data",
      "To make future predictions",
    ],
    solution: "To make future predictions",
  },
  {
    title: "ML Engineer Salary",
    description: "What is the approximate average salary of an ML Engineer?",
    type: "select",
    options: ["Select Correct Answer", "80,000$", "121,600$", "150,000$"],
    solution: "121,600$",
  },
  {
    title: "Supervised Learning",
    description: "Which of the following is an example of supervised learning?",
    type: "select",
    options: [
      "Select Correct Answer",
      "Clustering",
      "Classification",
      "Data Augmentation",
    ],
    solution: "Classification",
  },
  {
    title: "Unsupervised Learning",
    description: "Which type of ML is used to find hidden patterns in data?",
    type: "select",
    options: [
      "Select Correct Answer",
      "Supervised Learning",
      "Unsupervised Learning",
      "Reinforcement Learning",
    ],
    solution: "Unsupervised Learning",
  },
  {
    title: "Overfitting Prevention",
    description: "Which technique helps reduce overfitting in neural networks?",
    type: "select",
    options: [
      "Select Correct Answer",
      "Dropout",
      "Batch Normalization",
      "Both",
    ],
    solution: "Both",
  },
  {
    title: "Bias in ML",
    description: "A high-bias model is likely to exhibit which problem?",
    type: "select",
    options: [
      "Select Correct Answer",
      "Overfitting",
      "Underfitting",
      "Exploding Gradients",
    ],
    solution: "Underfitting",
  },
  {
    title: "Feature Engineering",
    description: "What is the primary goal of feature engineering?",
    type: "select",
    options: [
      "Select Correct Answer",
      "Reduce model complexity",
      "Improve model accuracy",
      "Increase training time",
    ],
    solution: "Improve model accuracy",
  },
  {
    title: "Data Preprocessing",
    description: "Why is data normalization important in ML?",
    type: "select",
    options: [
      "Select Correct Answer",
      "To improve model performance",
      "To increase dataset size",
      "To remove outliers",
    ],
    solution: "To improve model performance",
  },
  {
    title: "Loss Functions",
    description:
      "Which loss function is commonly used for classification tasks?",
    type: "select",
    options: [
      "Select Correct Answer",
      "Mean Squared Error",
      "Cross-Entropy Loss",
      "Hinge Loss",
    ],
    solution: "Cross-Entropy Loss",
  },
  {
    title: "Hyperparameter Tuning",
    description: "Which method is commonly used for hyperparameter tuning?",
    type: "select",
    options: [
      "Select Correct Answer",
      "Grid Search",
      "Batch Normalization",
      "Dropout",
    ],
    solution: "Grid Search",
  },
  {
    title: "Gradient Descent",
    description: "What is the primary objective of gradient descent?",
    type: "select",
    options: [
      "Select Correct Answer",
      "To minimize the loss function",
      "To increase accuracy",
      "To reduce model complexity",
    ],
    solution: "To minimize the loss function",
  },
  {
    title: "Evaluation Metrics",
    description:
      "Which metric is commonly used to evaluate classification models?",
    type: "select",
    options: [
      "Select Correct Answer",
      "Accuracy",
      "Mean Squared Error",
      "ROC-AUC",
    ],
    solution: "Accuracy",
  },
  {
    title: "Learning Rate Impact",
    description: "What happens if the learning rate is too high?",
    type: "select",
    options: [
      "Select Correct Answer",
      "The model converges faster",
      "The model oscillates and fails to converge",
      "The model becomes more complex",
    ],
    solution: "The model oscillates and fails to converge",
  },
  {
    title: "Train-Test Split",
    description: "What is the typical train-test split ratio?",
    type: "select",
    options: ["Select Correct Answer", "80-20", "70-30", "60-40"],
    solution: "80-20",
  },
  {
    title: "Future of ML",
    description: "Which of the following is considered a future trend in ML?",
    type: "select",
    options: [
      "Select Correct Answer",
      "Self-supervised Learning",
      "Rule-based AI",
      "Manual Feature Engineering",
    ],
    solution: "Self-supervised Learning",
  },
];

module.exports = ai_challenges;
