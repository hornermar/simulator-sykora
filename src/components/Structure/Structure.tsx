import { getCellSize } from "../../utils/getCellSize";
import { Box, Stack } from "@mui/material";
import { map, size } from "lodash";
import {
  CSSProperties,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Cell } from "../../types/General";
import { StructureGrid } from "./Grid";

export type StructureProps = {
  grid: string[][];
  defaultGrid?: string[][];
  sx?: CSSProperties;
  onCellClick?: (x: number, y: number, name: string) => void;
  activeCell?: Cell;
  activeNeighbours?: Cell[];
  displayDefaultGrid?: boolean;
  exampleMode?: boolean;
  displayName?: boolean;
};

export const Structure = memo(function Structure({
  grid,
  defaultGrid,
  sx,
  onCellClick,
  activeCell,
  activeNeighbours,
  displayDefaultGrid,
}: StructureProps) {
  const [cellSize, setCellSize] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  const rowsCount = size(grid);
  const columnsCount = Math.max(...map(grid, (row) => size(row)));

  useEffect(() => {
    const newCellSize = getCellSize(ref, columnsCount, rowsCount);
    setCellSize(Math.floor(newCellSize));
  }, [columnsCount, rowsCount]);

  const handleCellClick = useCallback(
    (x: number, y: number, name: string) => {
      if (onCellClick) {
        onCellClick(x, y, name);
      }
    },
    [onCellClick]
  );

  return (
    <Stack
      flexDirection="column"
      width="100%"
      alignItems="center"
      sx={{ margin: "0 auto", ...sx }}
      ref={ref}
    >
      {cellSize > 0 ? (
        <StructureGrid
          grid={grid}
          cellSize={cellSize}
          defaultGrid={defaultGrid}
          displayDefaultGrid={displayDefaultGrid}
          activeNeighbours={activeNeighbours}
          activeCell={activeCell}
          handleCellClick={onCellClick && handleCellClick}
        />
      ) : (
        <Box
          sx={{
            width: "100%",
            paddingBottom: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.03)",
          }}
        ></Box>
      )}
    </Stack>
  );
});
