import readline from 'readline'

export const continueOrQuit = async (
  question: string,
  yes = 'y',
  no = 'n',
): Promise<void> => {
  const answer = await askQuestion(question)
  const finalAnswer = answer.toLowerCase()

  switch (finalAnswer) {
    case yes:
      console.log('Continuing...')
      break
    case no:
      console.log('End program')
      process.exit(0)
      break
    default:
      console.log('Invalid prompt')
      return continueOrQuit(question, yes, no)
  }
}

const stdRl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const askQuestion = (question: string): Promise<string> =>
  new Promise((resolve) => {
    stdRl.question(question, resolve)
  })
