"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreateLinkModal } from "@/hooks/use-createlink-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createLinkSchema } from "@/lib/validations";
import { toast } from "sonner";
import { createLink } from "@/actions";
import { useState } from "react";

export const CreateLinkModal = () => {
  const { username, isOpen, onClose } = useCreateLinkModal();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof createLinkSchema>>({
    resolver: zodResolver(createLinkSchema),
    defaultValues: {
      name: "",
      url: "",
    },
  });

  async function onSubmit(values: z.infer<typeof createLinkSchema>) {
    try {
      setLoading(true);
      await createLink(values, username);
      onClose();
      form.reset();
      toast.success("Link added successfully");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Link</DialogTitle>
          <DialogDescription>Add your link to your linktree</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the name for your link"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the URL of your link"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={loading}
              className="bg-purple-700 hover:bg-purple-600 rounded-full w-full"
              type="submit"
            >
              Add Link
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
