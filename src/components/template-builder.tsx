"use client";

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  type DragEndEvent,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button, Panel } from "@/components/ui";
import { useStore } from "@/lib/store";
import type { Step, TaskTemplate } from "@/lib/types";

function useSelectedStep(steps: Step[]) {
  const [selectedId, setSelectedId] = useState<string | null>(
    steps[0]?.id ?? null,
  );

  useEffect(() => {
    if (!steps.find((s) => s.id === selectedId)) {
      setSelectedId(steps[0]?.id ?? null);
    }
  }, [steps, selectedId]);

  return [selectedId, setSelectedId] as const;
}

function SortableStep({
  step,
  templateId,
  selected,
  onSelect,
}: {
  step: Step;
  templateId: string;
  selected: boolean;
  onSelect: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: step.id });
  const { removeStep } = useStore();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-start gap-2 rounded-xl border px-3 py-3 transition ${
        selected
          ? "border-teal bg-teal/5 shadow-sm"
          : "border-line bg-surface hover:border-teal/40"
      } ${isDragging ? "z-20 opacity-90 shadow-lg" : ""}`}
    >
      <button
        type="button"
        className="mt-0.5 cursor-grab touch-none rounded-md p-1 text-muted hover:bg-sand-deep active:cursor-grabbing"
        aria-label="Drag to reorder"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={onSelect}
        className="min-w-0 flex-1 text-left"
      >
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-navy text-[11px] font-semibold text-sand">
            {step.order}
          </span>
          <span className="truncate text-sm font-medium text-navy">
            {step.title}
          </span>
        </div>
        <p className="mt-1 line-clamp-2 pl-8 text-xs text-muted">
          {step.description}
        </p>
      </button>
      <button
        type="button"
        className="rounded-md p-1.5 text-muted hover:bg-warning/10 hover:text-warning"
        aria-label="Remove step"
        onClick={() => removeStep(templateId, step.id)}
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

export function TemplateBuilder({ template }: { template: TaskTemplate }) {
  const { reorderSteps, addStep, updateStep, updateTemplate } = useStore();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const steps = [...template.steps].sort((a, b) => a.order - b.order);
  const [selectedId, setSelectedId] = useSelectedStep(steps);

  const selected = steps.find((s) => s.id === selectedId) ?? steps[0];

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = steps.findIndex((s) => s.id === active.id);
    const newIndex = steps.findIndex((s) => s.id === over.id);
    reorderSteps(template.id, arrayMove(steps, oldIndex, newIndex));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
      <Panel className="p-4">
        <div className="mb-4 space-y-3">
          <label className="block text-xs font-medium uppercase tracking-wide text-muted">
            Template title
            <input
              className="mt-1.5 w-full rounded-xl border border-line bg-sand/40 px-3 py-2.5 text-sm text-navy outline-none focus:border-teal"
              value={template.title}
              onChange={(e) =>
                updateTemplate({ ...template, title: e.target.value })
              }
            />
          </label>
          <label className="block text-xs font-medium uppercase tracking-wide text-muted">
            Description
            <textarea
              className="mt-1.5 min-h-20 w-full rounded-xl border border-line bg-sand/40 px-3 py-2.5 text-sm text-navy outline-none focus:border-teal"
              value={template.description}
              onChange={(e) =>
                updateTemplate({ ...template, description: e.target.value })
              }
            />
          </label>
        </div>

        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-navy">
            Steps ({steps.length})
          </h2>
          <Button
            variant="secondary"
            className="!px-3 !py-1.5 text-xs"
            onClick={() => addStep(template.id)}
          >
            <Plus className="h-3.5 w-3.5" />
            Add
          </Button>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
        >
          <SortableContext
            items={steps.map((s) => s.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {steps.map((step) => (
                <SortableStep
                  key={step.id}
                  step={step}
                  templateId={template.id}
                  selected={selected?.id === step.id}
                  onSelect={() => setSelectedId(step.id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </Panel>

      <Panel className="p-5 sm:p-6">
        {selected ? (
          <div className="animate-rise space-y-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-teal">
                Editing step {selected.order}
              </p>
              <h2 className="mt-1 font-[family-name:var(--font-display)] text-2xl text-navy">
                Step content
              </h2>
            </div>
            <label className="block text-xs font-medium uppercase tracking-wide text-muted">
              Title
              <input
                className="mt-1.5 w-full rounded-xl border border-line bg-sand/40 px-3 py-2.5 text-sm text-navy outline-none focus:border-teal"
                value={selected.title}
                onChange={(e) =>
                  updateStep(template.id, selected.id, {
                    title: e.target.value,
                  })
                }
              />
            </label>
            <label className="block text-xs font-medium uppercase tracking-wide text-muted">
              Short description
              <input
                className="mt-1.5 w-full rounded-xl border border-line bg-sand/40 px-3 py-2.5 text-sm text-navy outline-none focus:border-teal"
                value={selected.description}
                onChange={(e) =>
                  updateStep(template.id, selected.id, {
                    description: e.target.value,
                  })
                }
              />
            </label>
            <label className="block text-xs font-medium uppercase tracking-wide text-muted">
              Instructional content
              <textarea
                className="mt-1.5 min-h-56 w-full rounded-xl border border-line bg-sand/40 px-3 py-2.5 text-sm leading-relaxed text-navy outline-none focus:border-teal"
                value={selected.content}
                onChange={(e) =>
                  updateStep(template.id, selected.id, {
                    content: e.target.value,
                  })
                }
              />
            </label>
          </div>
        ) : (
          <p className="text-sm text-muted">Add a step to begin editing.</p>
        )}
      </Panel>
    </div>
  );
}
