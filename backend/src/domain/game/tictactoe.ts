export type Cell = 'X' | 'O' | null;
export type Board = [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell];

export interface MatchState {
  board: Board;
  currentTurn: 'X' | 'O';
  moves: number;
  winner: 'X' | 'O' | 'DRAW' | null;
}

export function createInitialState(): MatchState {
  return {
    board: [null, null, null, null, null, null, null, null, null],
    currentTurn: 'X',
    moves: 0,
    winner: null,
  };
}

export function applyMove(state: MatchState, player: 'X' | 'O', index: number): MatchState {
  if (state.winner) throw new Error('Match already ended');
  if (player !== state.currentTurn) throw new Error('Invalid turn');
  if (index < 0 || index > 8) throw new Error('Out of range');
  if (state.board[index] !== null) throw new Error('Cell occupied');

  const board = [...state.board] as Board;
  board[index] = player;
  const moves = state.moves + 1;
  const winner = resolveWinner(board, moves);

  return {
    board,
    moves,
    winner,
    currentTurn: state.currentTurn === 'X' ? 'O' : 'X',
  };
}

function resolveWinner(board: Board, moves: number): MatchState['winner'] {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ] as const;

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[b] === board[c]) return board[a];
  }

  return moves === 9 ? 'DRAW' : null;
}
