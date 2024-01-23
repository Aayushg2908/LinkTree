"use client";

import { Link as PrismaLink } from "@prisma/client";
import { LinkCard } from "./Link";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import { updateOrder } from "@/actions";
import { toast } from "sonner";

export const Links = ({
  links,
  username,
}: {
  links: PrismaLink[];
  username: string;
}) => {
  const [allLinks, setAllLinks] = useState<PrismaLink[]>(links);
  const [isMounted, setIsMounted] = useState(false);

  const onDragEnd = async (result: any) => {
    const { destination, source, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "links") {
      if (source.droppableId === destination.droppableId) {
        const newLinks = [...allLinks];
        const [removed] = newLinks.splice(source.index, 1);
        newLinks.splice(destination.index, 0, removed);
        newLinks.forEach((link, index) => {
          link.order = index;
        });
        setAllLinks(newLinks);
        const updatedLinks = await updateOrder(newLinks, username);
        if (updatedLinks) {
          toast.success("Links reordered successfully");
        } else {
          toast.error("Something went wrong!");
        }
      }
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="links" type="links">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="px-4 w-full flex flex-col items-center mb-4"
          >
            {allLinks.length > 0 ? (
              <div className="sm:px-4 w-full flex flex-col items-center gap-y-4">
                {allLinks.map((link, index) => (
                  <LinkCard
                    key={link.id}
                    link={link}
                    username={username}
                    index={index}
                  />
                ))}
                {provided.placeholder}
              </div>
            ) : (
              <div className="text-gray-500 text-2xl">
                No links yet! Create One...
              </div>
            )}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
