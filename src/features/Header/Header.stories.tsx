import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ReduxStoreProviderDecorator } from "stories/decorators/ReduxStoreProviderDecorator";
import { Header } from "./Header";

const meta: Meta<typeof Header> = {
    title: "TodoLists/Header",
    component: Header,
    tags: ["autodocs"],
    decorators: [ReduxStoreProviderDecorator],
};

export default meta;

type Story = StoryObj<typeof Header>;

export const HeaderStory: Story = {};
