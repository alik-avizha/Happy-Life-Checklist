import type {Meta, StoryObj} from '@storybook/react';
import App from '../components/App/App';
import {ReduxStoreProviderDecorator} from './decorators/ReduxStoreProviderDecorator';

const meta: Meta<typeof App> = {
    title: 'TodoLists/AppWithRedux',
    component: App,
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator]

};

export default meta;
type Story = StoryObj<typeof App>;

export const AppWithReduxStory: Story = {}

