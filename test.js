var openingLines = [
  "Hi [Recipient's Name],",
  "Good morning/afternoon/evening [Recipient's Name],",
  "Hope you're doing well [Recipient's Name],",
  "I trust this email finds you well [Recipient's Name],",
  "I hope this email finds you in good health and spirits [Recipient's Name],",
  "Warm greetings [Recipient's Name],",
  "Happy [Day of the week] [Recipient's Name],",
  "I'm writing to you today to [Purpose of email] [Recipient's Name],",
  "Thanks for taking the time to read my email [Recipient's Name],",
  "It's great to connect with you [Recipient's Name],",
]

var compliments = [
  "You have a great sense of humor!",
  "You are an incredibly talented [artist/writer/programmer/etc.]!",
  "You have a contagious smile!",
  "You are always so kind and thoughtful!",
  "Your hard work and dedication are truly impressive!",
  "You have a wonderful sense of style!",
  "Your positive attitude is infectious!",
  "You have a brilliant mind!",
  "You are an amazing listener!",
  "You have a beautiful soul!",
]

function generateEmail() {
  return `
  ${openingLines[Math.floor(Math.random() * openingLines.length)]}

  ${compliments[Math.floor(Math.random() * compliments.length)]}
`
}

for (var i = 0; i < 10; i++) {
  console.log(generateEmail())
}
