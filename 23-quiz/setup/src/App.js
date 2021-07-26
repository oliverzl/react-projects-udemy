import React from "react";
import { useGlobalContext } from "./context";

import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Modal from "./Modal";
function App() {
	const { waiting, loading, questions, index, correct, nextQuestion, checkAnswer } = useGlobalContext();

	//loading: already completed form, fetching questions
	//waiting: waiting for user to check the checkboxes\

	if (waiting) {
		return <SetupForm />;
	}

	if (loading) {
		return <Loading />;
	}

	console.log(questions);

	const { question, incorrect_answers, correct_answer } = questions[index];
	const answers = [...incorrect_answers, correct_answer];

	return (
		<main>
			<Modal />
			<section className="quiz">
				<p className="correct-answers">
					Correct Answers: {correct}/{index}
				</p>
				<article className="container">
					<h2 dangerouslySetInnerHTML={{ __html: question }} />
					<div className="btn-container">
						{answers.map((answer, index) => {
							return (
								<button
									className="answer-btn"
									onClick={() => checkAnswer(correct_answer === answer)}
									key={index}
									dangerouslySetInnerHTML={{ __html: answer }}
								/>
							);
						})}
					</div>
				</article>
				<button className="next-question" onClick={nextQuestion}>
					next question
				</button>
			</section>
		</main>
	);
}

export default App;
