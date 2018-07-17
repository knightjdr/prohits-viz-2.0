import React from 'react';
import { shallow } from 'enzyme';

import Annotation from './panel__annotation';

describe('Annotation panel', () => {
  it('should render', () => {
    const wrapper = shallow(
      <Annotation
        addAnnotation={jest.fn()}
        annotation=""
        annotationColor="#ff0000"
        clearAllAnnotations={jest.fn()}
        clearAllMarkers={jest.fn()}
        clearLastAnnotation={jest.fn()}
        clearLastMarker={jest.fn()}
        clearSearch={jest.fn()}
        closeAnnotationColorPicker={jest.fn()}
        closeMarkerColorPicker={jest.fn()}
        handleAnnotationColor={jest.fn()}
        handleMarkerColor={jest.fn()}
        handleSearch={jest.fn()}
        markerColor="#000000"
        move={false}
        record={false}
        searchTerm=""
        showAnnotationPicker={false}
        showMarkerPicker={false}
        toggleAnnotationColorPicker={jest.fn()}
        toggleMarkerColorPicker={jest.fn()}
        toggleMove={jest.fn()}
        toggleRecord={jest.fn()}
        updateAnnotation={jest.fn()}
        updateSearchTerm={jest.fn()}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
