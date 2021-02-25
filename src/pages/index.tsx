
import { CompletedChallengeds } from '../components/CompletedChallengeds';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';

import Head from 'next/head'

import styles from '../styles/pages/Home.module.css'
import { ChallengeBox } from '../components/ChallengeBox';
import { CountdownProvider } from '../contexts/CountdownContext';

export default function Home() {
  return (    
    <div className= {styles.container}>

      <head>
       <title>Início | move.it</title> 
      </head>
      <ExperienceBar />

    <CountdownProvider>
        <section>
          <div >
            <Profile />
            <CompletedChallengeds />
            <Countdown />           
          </div>
          <div>
          <ChallengeBox />
          </div>
        </section>
      </CountdownProvider>
    </div>
  )
}
