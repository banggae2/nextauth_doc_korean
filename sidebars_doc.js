export default {
  documentSidebar: [
    {
      type: 'category',
      label: '시작하기',
      items: [
        {
          type: 'doc',
          id: 'getting-started/introduction',
        },
        {
          type: 'doc',
          id: 'getting-started/example',
        },
        {
          type: 'doc',
          id: 'getting-started/client',
        },
        {
          type: 'doc',
          id: 'getting-started/rest-api',
        },
        {
          type: 'doc',
          id: 'getting-started/typescript',
        },
        {
          type: 'doc',
          id: 'getting-started/upgrade-v4',
        },
      ],
    },
    {
      type: 'category',
      label: '구성',
      items: [
        {
          type: 'doc',
          id: 'configuration/initialization',
        },
        {
          type: 'doc',
          id: 'configuration/options',
        },
        {
          type: 'category',
          label: '프로비더',
          items: [
            {
              type: 'doc',
              id: 'configuration/providers/oauth'
            },
            {
              type: 'doc',
              id: 'configuration/providers/email'
            },
            {
              type: 'doc',
              id: 'configuration/providers/credentials'
            },
          ]
        },
        {
          type: 'doc',
          id: 'configuration/databases',
        },
        {
          type: 'doc',
          id: 'configuration/pages',
        },
        {
          type: 'doc',
          id: 'configuration/callbacks',
        },
        {
          type: 'doc',
          id: 'configuration/events',
        },
        {
          type: 'doc',
          id: 'configuration/nextjs',
        },
      ],
    },
    {
      type: 'category',
      label: '프로비더',
      link: {
        type: 'doc',
        id: 'providers/overview'
      },
      items: [
        {
          type: 'autogenerated',
          dirName: 'providers',
        },
      ]
    },
    {
      type: 'doc',
      id: 'adapters',
    },
    {
      type: 'doc',
      id: 'warnings',
    },
    {
      type: 'doc',
      id: 'errors',
    },
    {
      type: 'doc',
      id: 'deployment',
    },
    {
      type: 'category',
      label: '가이드',
      link: {
        type: 'doc',
        id: 'guides/guides'
      },
      items: [
        {
          type: 'doc',
          id: 'guides/basics',
        },
        {
          type: 'doc',
          id: 'guides/fullstack',
        },
        {
          type: 'doc',
          id: 'guides/testing',
        }
      ],
    },
  ],
};