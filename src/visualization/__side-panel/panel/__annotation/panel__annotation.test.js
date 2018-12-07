import React from 'react';
import { shallow } from 'enzyme';

import Annotation from './panel__annotation';

describe('Annotation panel', () => {
  it('should match snapshot', () => {
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
        fontSize={12}
        handleAnnotationColor={jest.fn()}
        handleAnnotationSize={jest.fn()}
        handleMarkerColor={jest.fn()}
        handleSearch={jest.fn()}
        markerColor="#000000"
        move={false}
        record={false}
        search={{}}
        showAnnotationPicker={false}
        showMarkerPicker={false}
        tab="main"
        toggleAnnotationColorPicker={jest.fn()}
        toggleMarkerColorPicker={jest.fn()}
        toggleMarkers={jest.fn()}
        toggleShow={jest.fn()}
        toggleRecord={jest.fn()}
        updateAnnotation={jest.fn()}
        updateSearchTerm={jest.fn()}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
