"use client";
import { useEffect, useState, useRef } from "react";

interface Position {
  x: number;
  y: number;
}

const GRID_ROWS = 7;
const GRID_COLS = 52;
const INITIAL_SPEED = 150;

export default function SnakeMatrix() {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 3 }]);
  const [direction, setDirection] = useState<Position>({ x: 1, y: 0 });
  const [food, setFood] = useState<Position>({ x: 20, y: 3 });
  const [trail, setTrail] = useState<Set<string>>(new Set());
  const gameLoopRef = useRef<NodeJS.Timeout>();

  const isInSnake = useRef((pos: Position, snakeBody: Position[]): boolean => {
    return snakeBody.some(
      (segment) => segment.x === pos.x && segment.y === pos.y,
    );
  }).current;

  const generateFood = (): Position => {
    return {
      x: Math.floor(Math.random() * GRID_COLS),
      y: Math.floor(Math.random() * GRID_ROWS),
    };
  };

  const getNextDirection = useRef(
    (
      head: Position,
      target: Position,
      currentDirection: Position,
    ): Position => {
      const dx = target.x - head.x;
      const dy = target.y - head.y;

      if (Math.abs(dx) > Math.abs(dy)) {
        return { x: dx > 0 ? 1 : -1, y: 0 };
      } else if (dy !== 0) {
        return { x: 0, y: dy > 0 ? 1 : -1 };
      }
      return currentDirection;
    },
  ).current;

  useEffect(() => {
    const moveSnake = () => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        if (!head) return prevSnake;

        const newDirection = getNextDirection(head, food, direction);
        setDirection(newDirection);

        const newHead = {
          x: (head.x + newDirection.x + GRID_COLS) % GRID_COLS,
          y: (head.y + newDirection.y + GRID_ROWS) % GRID_ROWS,
        };

        const ateFood = newHead.x === food.x && newHead.y === food.y;

        const newSnake = [newHead, ...prevSnake];

        if (!ateFood) {
          newSnake.pop();
        } else {
          let newFood = generateFood();
          while (isInSnake(newFood, newSnake)) {
            newFood = generateFood();
          }
          setFood(newFood);
        }

        setTrail((prevTrail) => {
          const newTrail = new Set(prevTrail);
          newSnake.forEach((segment) => {
            newTrail.add(`${segment.x}-${segment.y}`);
          });
          if (newTrail.size > 100) {
            const trailArray = Array.from(newTrail);
            const limitedTrail = new Set(trailArray.slice(-100));
            return limitedTrail;
          }
          return newTrail;
        });

        return newSnake;
      });
    };

    gameLoopRef.current = setInterval(moveSnake, INITIAL_SPEED);

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [food, direction, getNextDirection, isInSnake]);

  const getIntensity = (x: number, y: number): number => {
    const key = `${x}-${y}`;
    const snakeIndex = snake.findIndex((s) => s.x === x && s.y === y);

    if (snakeIndex === 0) return 5;
    if (snakeIndex > 0) {
      const intensity = 5 - Math.floor((snakeIndex / snake.length) * 3);
      return Math.max(2, intensity);
    }
    if (trail.has(key)) return 1;
    return 0;
  };

  const getColor = (intensity: number): string => {
    const colors = [
      "bg-black border-gray-900/20",
      "bg-red-950/30 border-red-900/20",
      "bg-red-800/50 border-red-700/30",
      "bg-red-600/70 border-red-500/40",
      "bg-red-500/90 border-red-400/50",
      "bg-red-400 border-red-300 shadow-md shadow-red-500/50",
    ];
    return colors[intensity] ?? colors[0] ?? "bg-black border-gray-900/20";
  };

  return (
    <div className="w-full bg-black max-[500px]:hidden">
      <div className="w-full">
        <div
          className="grid w-full gap-[2px] max-[400px]:h-[200px]"
          style={{
            gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${GRID_ROWS}, minmax(0, 1fr))`,
            aspectRatio: `${GRID_COLS} / ${GRID_ROWS}`,
          }}
        >
          {Array.from({ length: GRID_ROWS }).map((_, row) =>
            Array.from({ length: GRID_COLS }).map((_, col) => {
              const intensity = getIntensity(col, row);
              const isFood = food.x === col && food.y === row;

              return (
                <div
                  key={`${row}-${col}`}
                  className={`
                    ${isFood ? "animate-pulse border-white/50 bg-white/90 shadow-lg shadow-white/30" : getColor(intensity)}
                    h-full w-full rounded-[1px] border transition-all duration-200
                  `}
                  style={{
                    aspectRatio: "1 / 1",
                  }}
                />
              );
            }),
          )}
        </div>
      </div>
    </div>
  );
}
