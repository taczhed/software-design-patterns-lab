# Game of Life Simulation

This project is exercise of Software Design Patterns.

## Design Patterns Used

### 1. **Singleton Pattern**
- `Config.ts`: Ensures there is only one instance of the configuration, which is shared across the application to maintain consistency in settings.

### 2. **Factory Method Pattern**
- `GridFactory.ts`: Provides a factory for creating `Grid` objects, specifically for creating random grids with adjustable probabilities for cell activation.

### 3. **Builder Pattern**
- `ButtonBuilder.ts`: Simplifies the construction of `Button` objects with various configurations (e.g., labels, positions, and colors).

### 4. **Adapter Pattern**
- `GridAdapter.ts`: Transforms `Grid` objects into a JSON format for easy storage and retrieval (e.g., saving/loading the game state).

### 5. **State Pattern**
- `GameController.ts`: Manages and toggles the state of the game (e.g., running or stopped), encapsulating the behavior based on the current state.

## **Inputs and Outputs**

#### **Inputs**
1. **Mouse Clicks**:
    - Trigger actions on the buttons to toggle the game state, save/load the grid, or toggle individual cells.
2. **URL Parameter `n`**:
    - Optionally overrides the default interval for updating the game in seconds.

#### **Outputs**
1. **Visual Output**:
    - The grid and UI components are dynamically rendered on the canvas.
2. **Persistent Data**:
    - The grid state is saved in `localStorage`, enabling the user to load the game later.

## **Communication Between Objects**

1. **`Config` ↔ `App`** :
    - Provides shared configuration settings, such as dimensions and colors, to all components.

2. **`GameController` ↔ `Grid`**:
    - `GameController` updates the `Grid` state each generation and toggles cell states based on user interaction.

3. **`Button` ↔ `GameController`**:
    - `Button` trigger methods in `GameController`, such as toggling the running state, saving, or loading the grid.

4. **`GridAdapter` ↔ `Grid`** :
    - Handles serialization and deserialization of the grid for storage in `localStorage`.

## Running the Application

https://taczhed.github.io/software-design-patterns-lab/public/?n=1
