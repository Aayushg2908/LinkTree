"use client";

import { SocialButton } from "@prisma/client";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import { SocialButtonCard } from "./SocialButtonCard";
import { toast } from "sonner";
import { updateSocialButtonsOrder } from "@/actions";

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

    if (type === "socialButtons") {
      if (source.droppableId === destination.droppableId) {
        const newSocialButtons = [...socialButtons];
        const [removed] = newSocialButtons.splice(source.index, 1);
        newSocialButtons.splice(destination.index, 0, removed);
        newSocialButtons.forEach((socialButton, index) => {
          socialButton.order = index;
        });
        socialButtons = newSocialButtons;
        const updatedSocialButtons = await updateSocialButtonsOrder(
          newSocialButtons,
          username
        );
        if (updatedSocialButtons) {
          toast.success("Social Buttons reordered successfully");
        } else {
          toast.error("Something went wrong!");
        }
      }
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
            className="px-4 w-full flex flex-col items-center mb-4 mt-8 transition-all"
          >
            {socialButtons.length > 0 ? (
              <div className="sm:px-4 w-full flex flex-col items-center gap-y-4 transition-all">
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
