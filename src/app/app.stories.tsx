import type { Meta, StoryObj } from "@storybook/react";
import App from "app/app";
import { BrowserRouterDecorator, ReduxStoreProviderDecorator } from "stories/decorators/ReduxStoreProviderDecorator";
import React from "react";

const meta: Meta<typeof App> = {
    title: "TodoLists/AppWithRedux",
    component: App,
    tags: ["autodocs"],
    decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator],
};

export default meta;

type Story = StoryObj<typeof App>;

export const AppWithReduxStory: Story = {};
