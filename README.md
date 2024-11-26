# Simulation Program Guidelines

Feel free to add more files to the program and include them in the main file.  
Different programming languages are accepted.

---

## Requirements
1. **Make simulation real-time.**
2. **Add pause/resume functionality.**
3. **Add save/load functionality.**
4. **Implement design patterns** where applicable.
5. **Provide a brief explanation** for the chosen design patterns.

---

## High-Level Logic
1. **Initialize the simulation grid.**
2. Start the simulation with a tick interval of `<n>` seconds.
3. At each tick:
    - **Update the grid**: Loop over each element of the board.
    - **Render the new generation.**

---

## General Approach
1. **Plan & document** the general workflow:
    - Define inputs and outputs.
    - Consider adding validation.
2. **Separate main algorithms and actors**:
    - Abstract common code where possible.
3. **Define communication** between objects.
4. **Identify applicable patterns** and list them.
5. Build **Proof of Concepts (PoCs)**:
    - Separate the implementation of specific steps.
    - Develop smaller modules and combine them into a complete application.
6. **Refine as needed.**

---

## Deadline
- **20th December 2024**

---

## Project Submission
Details about how to hand over the project will be provided on **24th November 2024**.

---

## Core software design patterns you can use:
- Singleton
- SOLID
- Factory
- Thread-Safety
- Adapter
- Builder
- Observer
- State
- Strategy