"use client";

import { SocialButton } from "@prisma/client";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import { SocialButtonCard } from "./SocialButtonCard";

export const SocialButtons = ({
  socialButtons,
  username,
}: {
  socialButtons: SocialButton[];
  username: string;
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onDragEnd = async (result: any) => {
    const { destination, source, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
  };

  if (!isMounted) return null;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="socialButtosn" type="socialButtons">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="px-4 w-full flex flex-col items-center mb-4 mt-8"
          >
            {socialButtons.length > 0 ? (
              <div className="sm:px-4 w-full flex flex-col items-center gap-y-4">
                {socialButtons.map((socialButton, index) => (
                  <SocialButtonCard
                    key={socialButton.id}
                    socialButton={socialButton}
                    username={username}
                    index={index}
                  />
                ))}
                {provided.placeholder}
              </div>
            ) : (
              <div className="text-gray-500 text-2xl">
                No Social Buttons yet! Create One...
              </div>
            )}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
