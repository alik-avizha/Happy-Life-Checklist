import type {Meta, StoryObj} from '@storybook/react';
import React from 'react';
import {Login} from './Login';
import {ReduxStoreProviderDecorator} from '../../stories/decorators/ReduxStoreProviderDecorator';

const meta: Meta<typeof Login> = {
  title: 'TodoLists/Login',
  component: Login,
  tags: ['autodocs'],
  decorators: [ReduxStoreProviderDecorator]
};

export default meta;

type Story = StoryObj<typeof Login>;

export const LoginStory: Story = {}



