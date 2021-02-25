import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/CompletedChallengeds.module.css'

export function CompletedChallengeds(){
    const { challengesCompleted} = useContext(ChallengesContext)

    return(
        <div className={styles.CompletedChallengedsContainer}>
            <span>Desafios Completos</span>
            <span>{challengesCompleted}</span>
        </div>
    )
}