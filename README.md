# Cybersecurity Mock Exam

Static study website for practicing closed-ended questions with the same timing and scoring rules used by the mock exam interface.

## Usage

Open the hosted website in a browser:

https://cyber-exam.rastgooasma835.workers.dev

For offline use, open `index.html` directly in a browser. No backend is required.

The site contains two practice modes:

- Generated quiz pool: questions exported from the topic JSON files.
- Real exam question simulations: closed-ended questions extracted from provided study materials and past/sample exports.

Both modes use:

- 32 random questions per attempt
- 60 minute time limit
- `correct - 0.3 * wrong` raw score
- `raw * 13 / 32` exam points
- raw scores below 17 marked as not sufficient

## Educational Use Notice

This project is intended only as a private educational study aid for students who are authorized to access the underlying course materials, specifically students attending the Cybersecurity course in the Embedded Systems track at Politecnico di Torino.

Do not use this website during an exam, graded assessment, or in any situation where external materials are not permitted. Do not publish or redistribute course materials unless you have permission to do so. If any included material is not authorized for your use, remove it.

The extracted questions are provided for review and self-assessment only. This project is not affiliated with or endorsed by Politecnico di Torino or the course staff.
