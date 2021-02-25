import { createContext, useState, ReactNode, useEffect } from 'react';
import challenges from '../../challenges.json';

interface Challenge {
    type:'body'| 'eye'
    description: string
    amount:number

}

interface ChallengesContextData{
    level: number;
    currentExperience: number;
    experienceToNextLevel: number;
    challengesCompleted: number;
    startNewChallenge: ()=> void;
    levelUp: ()=> void;
    activeChallenge: Challenge;
    resetChallenge: ()=> void;
    completeChallenge: ()=> void;
}

interface ChallengesProviderProps{
    children: ReactNode
}

export const ChallengesContext = createContext({} as ChallengesContextData)


export function ChallengesProvider ({children}) {
    const [level, setLevel] =useState(1)
    const [currentExperience, setCurrentExperience] = useState(0)
    const [challengesCompleted, setChallengesCompleted]= useState(0) 

    const [activeChallenge, SetActiveChallenge] =useState(null)

    const experienceToNextLevel = Math.pow((level + 1) *4 , 2)

    useEffect(() =>{
        Notification.requestPermission();
    }, [])


    function levelUp() {
    setLevel(level + 1)
  }


  function startNewChallenge () {
      const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
      const challenge = challenges[randomChallengeIndex]

      SetActiveChallenge(challenge)

      new Audio ('/notification.mp3').play()

      if (Notification.permission === 'granted') {
          new Notification('Novo Desafio ' , {
              body: `Valendo ${challenge.amount} xp!`
          })
      }
  }

  function resetChallenge(){
      SetActiveChallenge(null)
  }

  function completeChallenge(){
    if(!activeChallenge) {
        return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if(finalExperience >= experienceToNextLevel) {
        finalExperience = finalExperience - experienceToNextLevel
        levelUp();
    }

    setCurrentExperience(finalExperience);
    SetActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }


    return(
        
        <ChallengesContext.Provider 
        value={{
            level,
            currentExperience, 
            experienceToNextLevel,
            challengesCompleted,
            startNewChallenge, 
            levelUp,
            activeChallenge,
            resetChallenge,
            completeChallenge,
        }}>
            {children}
        </ChallengesContext.Provider>
    )
}