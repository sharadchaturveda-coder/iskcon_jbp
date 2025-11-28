import React, { useState } from 'react';
import { SectionHeading, GoldBorder } from '../ui/DesignElements';
import { CheckCircle, Trophy, BookOpen } from 'lucide-react';
import { Quiz } from '../../types';

// Mock Quiz Data
const QUIZZES: Quiz[] = [
  {
    id: 1,
    title: "Chapter 1-6: Karma Yoga",
    description: "Test your knowledge on the path of action.",
    questions: [
      { question: "Who is the speaker of Bhagavad Gita?", options: ["Arjuna", "Krishna", "Sanjaya", "Dhritarashtra"], correctAnswer: 1 },
      { question: "Where was the Gita spoken?", options: ["Ayodhya", "Vrindavan", "Kurukshetra", "Hastinapur"], correctAnswer: 2 },
      { question: "What represents the body in the analogy of the chariot?", options: ["Horses", "Reins", "Chariot", "Passenger"], correctAnswer: 2 },
      { question: "What is the nature of the soul?", options: ["Temporary", "Eternal", "Changing", "Invisible"], correctAnswer: 1 },
      { question: "Karma Yoga means:", options: ["Inaction", "Selfish action", "Action in devotion", "Renouncing work"], correctAnswer: 2 },
      { question: "What is the enemy of the soul?", options: ["Lust", "Money", "Power", "Time"], correctAnswer: 0 },
      { question: "Arjuna refused to fight because of:", options: ["Fear", "Compassion", "Laziness", "Anger"], correctAnswer: 1 },
      { question: "Who recorded the Gita?", options: ["Valmiki", "Vyasa", "Ganesh", "Narada"], correctAnswer: 2 },
      { question: "The soul transmigrates based on:", options: ["Chance", "Desire & Karma", "God's whim", "Evolution"], correctAnswer: 1 },
      { question: "To whom should one surrender?", options: ["Mind", "Senses", "Supreme Lord", "Demigods"], correctAnswer: 2 }
    ]
  },
  {
    id: 2,
    title: "Chapter 7-12: Bhakti Yoga",
    description: "Deep dive into the path of Devotion.",
    questions: [
      { question: "What is the supreme destination?", options: ["Heaven", "Brahmajyoti", "Vaikuntha", "Earth"], correctAnswer: 2 },
      { question: "Krishna is the source of:", options: ["Everything", "Some things", "Nothing", "Only spirit"], correctAnswer: 0 },
      { question: "Bhakti means:", options: ["Knowledge", "Devotional Service", "Austerity", "Meditation"], correctAnswer: 1 },
      { question: "Who is the greatest Yogi?", options: ["Jnani", "Karmi", "Bhakta", "Tapasvi"], correctAnswer: 2 },
      { question: "The form of Krishna is:", options: ["Imaginary", "Material", "Eternal & Blissful", "Temporary"], correctAnswer: 2 },
      { question: "Which leaf is mentioned as an offering?", options: ["Neem", "Tulasi", "Banyan", "Peepal"], correctAnswer: 1 },
      { question: "God is situated in:", options: ["Heart of all beings", "Only Temples", "Only Sky", "Books"], correctAnswer: 0 },
      { question: "What destroys ignorance?", options: ["Money", "Rituals", "Knowledge of Self", "Sleep"], correctAnswer: 2 },
      { question: "The universal form was shown to:", options: ["Duryodhana", "Arjuna", "Bhishma", "Karna"], correctAnswer: 1 },
      { question: "The most confidential knowledge is:", options: ["Become My Devotee", "Work Hard", "Meditate", "Study"], correctAnswer: 0 }
    ]
  },
  {
    id: 3,
    title: "General Krishna Consciousness",
    description: "General concepts of spiritual life.",
    questions: [
      { question: "What is the Maha Mantra?", options: ["Om Namah Shivaya", "Gayatri", "Hare Krishna", "Om"], correctAnswer: 2 },
      { question: "How many regulative principles are there?", options: ["2", "4", "10", "5"], correctAnswer: 1 },
      { question: "We are not the body but:", options: ["Mind", "Spirit Soul", "Brain", "Energy"], correctAnswer: 1 },
      { question: "What is Prasadam?", options: ["Ordinary food", "Mercy of Lord", "Medicine", "Snack"], correctAnswer: 1 },
      { question: "Who is the Founder Acharya of ISKCON?", options: ["Bhaktisiddhanta", "Prabhupada", "Bhaktivinoda", "Rupa Goswami"], correctAnswer: 1 },
      { question: "The age of quarrel is called:", options: ["Satya Yuga", "Treta Yuga", "Dvapara Yuga", "Kali Yuga"], correctAnswer: 3 },
      { question: "The recommended process for this age is:", options: ["Yoga", "Chanting Holy Names", "Silence", "Tapasya"], correctAnswer: 1 },
      { question: "Vedas means:", options: ["Knowledge", "History", "Poems", "Laws"], correctAnswer: 0 },
      { question: "The ultimate goal of life is:", options: ["Wealth", "Moksha", "Love of God", "Fame"], correctAnswer: 2 },
      { question: "Who is the mother of the universe?", options: ["Durga", "Earth", "Cow", "All of above"], correctAnswer: 3 }
    ]
  }
];

const GitaCoursePage: React.FC = () => {
  const [activeQuiz, setActiveQuiz] = useState<number | null>(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [score, setScore] = useState<number | null>(null);

  const startQuiz = (id: number) => {
    setActiveQuiz(id);
    setCurrentQIndex(0);
    setAnswers([]);
    setScore(null);
  };

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);
    if (activeQuiz !== null && newAnswers.length === QUIZZES.find(q => q.id === activeQuiz)?.questions.length) {
      // Calculate score
      const quiz = QUIZZES.find(q => q.id === activeQuiz);
      if (quiz) {
        let correctCount = 0;
        newAnswers.forEach((ans, idx) => {
          if (ans === quiz.questions[idx].correctAnswer) correctCount++;
        });
        setScore(correctCount);
      }
    } else {
      setCurrentQIndex(currentQIndex + 1);
    }
  };

  const closeQuiz = () => {
    setActiveQuiz(null);
    setScore(null);
  };

  const currentQuizData = activeQuiz !== null ? QUIZZES.find(q => q.id === activeQuiz) : null;

  return (
    <div className="pt-24 pb-12 min-h-screen bg-stone-50">
      
      {/* Section 1: Header */}
      <section className="container mx-auto px-4 mb-16 text-center">
        <SectionHeading title="Bhagavad Gita As It Is" subtitle="Ancient Wisdom for Modern Times" />
        <div className="bg-maroon-900 text-gold-400 inline-block px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider mb-8">
          Certification Course
        </div>
      </section>

      {/* Section 2: Course Content Grid */}
      <section className="container mx-auto px-4 mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
           <div>
             <h3 className="text-2xl font-serif font-bold text-maroon-900 mb-6">What you will learn</h3>
             <ul className="space-y-4">
               {[
                 "The distinction between the self and the body.",
                 "How karma works and how to be free from it.",
                 "The art of controlling the mind.",
                 "Practical application of spirituality in daily life.",
                 "The supreme yoga of love and devotion."
               ].map((item, idx) => (
                 <li key={idx} className="flex items-start text-maroon-800">
                   <CheckCircle className="text-gold-600 mr-3 flex-shrink-0" size={20} />
                   <span>{item}</span>
                 </li>
               ))}
             </ul>
           </div>
           <div className="bg-gold-100 p-8 rounded-xl border border-gold-300">
             <h3 className="text-xl font-bold text-maroon-900 mb-4 text-center">Course Details</h3>
             <div className="space-y-3 text-maroon-800">
               <div className="flex justify-between border-b border-gold-200 pb-2"><span>Duration:</span> <span className="font-bold">6 Weeks</span></div>
               <div className="flex justify-between border-b border-gold-200 pb-2"><span>Format:</span> <span className="font-bold">Online & Offline</span></div>
               <div className="flex justify-between border-b border-gold-200 pb-2"><span>Language:</span> <span className="font-bold">English & Hindi</span></div>
               <div className="flex justify-between border-b border-gold-200 pb-2"><span>Fees:</span> <span className="font-bold">Donation Based</span></div>
             </div>
             <button className="w-full mt-6 bg-maroon-900 text-white font-bold py-3 rounded-lg shadow hover:bg-maroon-800 transition-colors">
               Register Now
             </button>
           </div>
        </div>
      </section>

      {/* Section 3: Quizzes */}
      <section className="bg-maroon-900 py-16 text-stone-100 relative" id="quiz-section">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-serif font-bold text-gold-500 mb-2">Knowledge Checks</h3>
            <p className="text-stone-300">Test your understanding with our interactive quizzes.</p>
          </div>

          {!currentQuizData ? (
            /* Quiz List */
            <div className="grid md:grid-cols-3 gap-6">
              {QUIZZES.map((quiz) => (
                <div key={quiz.id} className="bg-maroon-800 p-6 rounded-xl border border-maroon-700 hover:border-gold-500 transition-colors group">
                  <div className="bg-gold-500/10 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-gold-400 group-hover:bg-gold-500 group-hover:text-maroon-900 transition-colors">
                    <BookOpen size={24} />
                  </div>
                  <h4 className="text-xl font-bold mb-2">{quiz.title}</h4>
                  <p className="text-stone-400 text-sm mb-6">{quiz.description}</p>
                  <button 
                    onClick={() => startQuiz(quiz.id)}
                    className="w-full bg-transparent border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-maroon-900 font-bold py-2 rounded transition-all"
                  >
                    Start Quiz
                  </button>
                </div>
              ))}
            </div>
          ) : (
            /* Active Quiz Interface */
            <div className="max-w-2xl mx-auto bg-stone-50 text-maroon-900 rounded-xl p-8 shadow-2xl border-4 border-gold-500">
              <div className="flex justify-between items-center mb-6">
                 <h4 className="text-xl font-bold font-serif">{currentQuizData.title}</h4>
                 <button onClick={closeQuiz} className="text-sm text-stone-500 hover:text-red-500">Exit Quiz</button>
              </div>

              {score === null ? (
                /* Question View */
                <div>
                  <div className="mb-4 text-sm text-gold-600 font-bold">Question {currentQIndex + 1} of {currentQuizData.questions.length}</div>
                  <p className="text-xl font-bold mb-6">{currentQuizData.questions[currentQIndex].question}</p>
                  <div className="space-y-3">
                    {currentQuizData.questions[currentQIndex].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        className="w-full text-left p-4 rounded-lg bg-stone-100 hover:bg-gold-100 border border-stone-200 hover:border-gold-400 transition-all font-semibold"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* Score View */
                <div className="text-center py-8">
                  <Trophy size={64} className="mx-auto text-gold-500 mb-4 animate-bounce" />
                  <h3 className="text-3xl font-bold mb-2">Quiz Completed!</h3>
                  <p className="text-xl mb-6">Your Score: <span className="text-gold-600 font-bold">{score}</span> / {currentQuizData.questions.length}</p>
                  
                  <div className="flex gap-4 justify-center">
                    <button 
                      onClick={() => startQuiz(currentQuizData.id)}
                      className="bg-maroon-900 text-white px-6 py-2 rounded hover:bg-maroon-800"
                    >
                      Retry
                    </button>
                    <button 
                      onClick={closeQuiz}
                      className="border border-maroon-900 text-maroon-900 px-6 py-2 rounded hover:bg-maroon-50"
                    >
                      Back to Quizzes
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Section 4: Testimonials */}
      <section className="container mx-auto px-4 mt-16 text-center">
        <h3 className="text-2xl font-serif font-bold text-maroon-900 mb-8">Student Experiences</h3>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow italic text-maroon-800 border-l-4 border-gold-500">
            "This course changed my perspective on life. The logic and philosophy are undeniable."
            <div className="mt-4 font-bold text-sm not-italic">- Rahul S.</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow italic text-maroon-800 border-l-4 border-gold-500">
            "Finally I understand why I am here and what my duty is. Highly recommended!"
            <div className="mt-4 font-bold text-sm not-italic">- Priya M.</div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default GitaCoursePage;