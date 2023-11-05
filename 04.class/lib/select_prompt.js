import Enquirer from "enquirer";

export default class SelectPrompt {
  constructor(message, choices) {
    this.message = message;
    this.choices = choices;
  }

  run() {
    const prompt = new Enquirer.Select(this.#generateQuestion());
    return prompt.run();
  }

  #generateQuestion() {
    return {
      message: this.message,
      choices: this.choices,
      result() {
        return this.focused.value;
      },
    };
  }
}
