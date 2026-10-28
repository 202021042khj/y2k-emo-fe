"use client";

import React, { ComponentPropsWithoutRef, forwardRef, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  closestCenter,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type Modifier,
  type SensorDescriptor,
  type SensorOptions,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableHeaderRow,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------------------------------
 * SortableTableRow
 * -----------------------------------------------------------------------------------------------*/
interface SortableTableRowProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

const SortableTableRow = forwardRef<HTMLTableRowElement, SortableTableRowProps>(
  ({ id, children, className }, ref) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id });

    const rowStyle = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.3 : 1,
    };

    return (
      <TableRow
        ref={(node) => {
          setNodeRef(node);
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        style={rowStyle}
        {...attributes}
        className={cn("transition-colors hover:bg-gray-100", className)}
      >
        {/* 드래그 핸들 셀 */}
        <TableCell className="w-8">
          <Button
            variant="text"
            color="black"
            {...listeners}
            className="cursor-grab p-0 active:cursor-grabbing"
          >
            ⠿
          </Button>
        </TableCell>
        {children}
      </TableRow>
    );
  },
);
SortableTableRow.displayName = "SortableTableRow";

/* -------------------------------------------------------------------------------------------------
 * SortableTableHeader
 * -----------------------------------------------------------------------------------------------*/
interface SortableTableHeaderProps {
  children: React.ReactNode;
  className?: string;
  sticky?: boolean;
}

export const SortableTableHeader = forwardRef<
  HTMLTableSectionElement,
  SortableTableHeaderProps
>(({ children, className, sticky = false }, ref) => (
  <TableHeader
    ref={ref}
    className={cn(sticky && "sticky top-0 z-10", className)}
  >
    <TableHeaderRow>
      <TableHead className="w-8"></TableHead>
      {children}
    </TableHeaderRow>
  </TableHeader>
));
SortableTableHeader.displayName = "SortableTableHeader";

/* -------------------------------------------------------------------------------------------------
 * SortableTableBody
 * -----------------------------------------------------------------------------------------------*/
/** Anything with a stable string id can be sorted */
export interface SortableItem {
  id: string;
}

interface SortableTableBodyProps<T extends SortableItem> {
  items: readonly T[];
  children: (item: T, index: number) => React.ReactNode;
  className?: string;
}

function SortableTableBodyRender<T extends SortableItem>(
  { items, children, className }: SortableTableBodyProps<T>,
  ref: React.ForwardedRef<HTMLTableSectionElement>,
) {
  return (
    <TableBody ref={ref} className={className}>
      {items.map((item, index) => (
        <SortableTableRow key={item.id} id={item.id}>
          {children(item, index)}
        </SortableTableRow>
      ))}
    </TableBody>
  );
}

// forwardRef drops generics, so restore them on the exported type
export const SortableTableBody = forwardRef(SortableTableBodyRender) as <T extends SortableItem>(
  props: SortableTableBodyProps<T> & React.RefAttributes<HTMLTableSectionElement>,
) => React.ReactElement;

/* -------------------------------------------------------------------------------------------------
 * SortableTable
 * -----------------------------------------------------------------------------------------------*/
interface SortableTableProps<T extends SortableItem> {
  items: readonly T[];
  onItemsChange: (items: T[]) => void;
  children: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
  sensors?: SensorDescriptor<SensorOptions>[];
  modifiers?: Modifier[];
  renderDragOverlay?: (item: T | undefined) => React.ReactNode;
}

function SortableTableRender<T extends SortableItem>(
  {
    items,
    onItemsChange,
    children,
    className,
    wrapperClassName,
    sensors,
    modifiers = [restrictToParentElement, restrictToVerticalAxis],
    renderDragOverlay,
  }: SortableTableProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  // 기본 센서 설정
  const defaultSensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  const finalSensors = sensors || defaultSensors;

  // 드래그 시작 시 실행되는 함수
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  // 드래그 종료 시 실행되는 함수
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const newItems = arrayMove(
        [...items],
        items.findIndex((item) => item.id === active.id),
        items.findIndex((item) => item.id === over.id),
      );

      onItemsChange(newItems);
    }

    setActiveId(null);
  };

  return (
    <div ref={ref} className={cn("relative w-full", wrapperClassName)}>
      <div className={cn(className)}>
        <DndContext
          sensors={finalSensors}
          modifiers={modifiers}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={items.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <Table>{children}</Table>
          </SortableContext>

          {/* 오버레이 영역 */}
          <DragOverlay modifiers={[restrictToVerticalAxis]}>
            {activeId && renderDragOverlay
              ? renderDragOverlay(items.find((item) => item.id === activeId))
              : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}

// forwardRef drops generics, so restore them on the exported type
export const SortableTable = forwardRef(SortableTableRender) as <T extends SortableItem>(
  props: SortableTableProps<T> & React.RefAttributes<HTMLDivElement>,
) => React.ReactElement;

/* -------------------------------------------------------------------------------------------------
 * SortableTableScrollArea
 * -----------------------------------------------------------------------------------------------*/

type SortableTableScrollAreaProps = ComponentPropsWithoutRef<"div">;

export const SortableTableScrollArea = forwardRef<
  HTMLDivElement,
  SortableTableScrollAreaProps
>(({ children, className, ...props }, ref) => (
  <div ref={ref} className={cn("w-full overflow-y-auto", className)} {...props}>
    {children}
  </div>
));
SortableTableScrollArea.displayName = "SortableTableScrollArea";

/* -------------------------------------------------------------------------------------------------
 * SortableTableEmpty
 * -----------------------------------------------------------------------------------------------*/

type SortableTableEmptyProps = ComponentPropsWithoutRef<"div">;

export const SortableTableEmpty = forwardRef<
  HTMLDivElement,
  SortableTableEmptyProps
>(({ children, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
      "inline-flex items-center justify-center",
      "text-font-14-400 text-gray-500",
      className,
    )}
    {...props}
  >
    {children}
  </div>
));
SortableTableEmpty.displayName = "SortableTableEmpty";
