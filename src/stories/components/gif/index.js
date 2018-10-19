import React from 'react';
import { setAddon, storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs/react';
import withReadme from 'storybook-readme/with-readme';
import JSXAddon from 'storybook-addon-jsx';
import StoryHeader from '../../../../storybook-utils/components/StoryHeader';
import { ThemeSelector } from '../../../addons/ThemeSwitcher';
import jsxConfig from '../../mock/jsxConfig';
import { Gif, Code } from '../../../components';
import Readme from '../../../components/Gif/README.md';
import { def, autoplay } from '../../mock/components/codes/gif';

setAddon(JSXAddon);
const stories = storiesOf('Components/Gif', module);

stories.addDecorator(withKnobs);

stories.addWithJSX(
  'Default',
  withReadme([Readme], () => (
    <ThemeSelector>
      <StoryHeader
        name="Gif"
        description="A lossless format for image files that supports both animated and static images, Its one of the most used image format on web."
      />
      <Gif
        image={text('Image', 'images/gif/write.gif')}
        preview={text('Preview', 'images/demo/develop.png')}
      />
      <div className="mt-4">
        <Code
          code={def}
          languageCode="jsx"
          readOnly
          collapsible
          collapsed
          showDeleteButton={false}
        />
      </div>
    </ThemeSelector>
  )),
  jsxConfig
);

stories.addWithJSX(
  'Autoplay',
  withReadme([Readme], () => (
    <ThemeSelector>
      <StoryHeader
        name="Gif"
        storyName="With Autoplay"
        description="A lossless format for image files that supports both animated and static images, Its one of the most used image format on web."
      />
      <Gif
        image={text('Image', 'images/gif/write.gif')}
        preview={text('Preview', 'images/demo/develop.png')}
        autoplay
      />
      <div className="mt-4">
        <Code
          code={autoplay}
          languageCode="jsx"
          readOnly
          collapsible
          collapsed
          showDeleteButton={false}
        />
      </div>
    </ThemeSelector>
  )),
  jsxConfig
);
