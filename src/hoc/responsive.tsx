import React from 'react';

import MediaQuery from 'react-responsive';

export const IsMobile: React.FC = ({ children }) => (
    <MediaQuery maxWidth={767}>
        {children}
    </MediaQuery>
)

export const GreaterThanTablet: React.FC = ({ children }) => (
    <MediaQuery minWidth={768}>
        {children}
    </MediaQuery>
)