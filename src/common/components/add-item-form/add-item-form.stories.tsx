import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { AddItemForm } from "common/components/add-item-form/add-item-form";

const meta: Meta<typeof AddItemForm> = {
    title: "TodoLists/AddItemForm",
    component: AddItemForm,
    tags: ["autodocs"],
    argTypes: {
        addItem: {
            description: "Button clicked inside form",
            action: "clicked",
        },
    },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

export const AddItemFormStory: Story = {
    args: {
        addItem: () =>
            new Promise(() => {
                action("Button clicked inside form")();
            }),
    },
};
