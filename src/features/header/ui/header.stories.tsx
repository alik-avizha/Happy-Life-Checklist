import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ReduxStoreProviderDecorator } from "app/decorators/ReduxStoreProviderDecorator";
import { Header } from "features/header/ui/header";

const meta: Meta<typeof Header> = {
    title: "TodoLists/header",
    component: Header,
    tags: ["autodocs"],
    decorators: [ReduxStoreProviderDecorator],
};

export default meta;

type Story = StoryObj<typeof Header>;

export const HeaderStory: Story = {};
