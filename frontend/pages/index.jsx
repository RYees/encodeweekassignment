import styles from "../styles/Home.module.css";
import InstructionsComponent from "../components/InstructionsComponent";
import TokenizedBallot from "../components/TokenizedBallot";
export default function Home() {
  return (
    <div>
      <main className=''>
        <TokenizedBallot></TokenizedBallot>
      </main>
    </div>
  );
}
