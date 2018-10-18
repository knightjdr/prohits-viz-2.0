import React from 'react';
import { shallow } from 'enzyme';

import fillJson from '../../fill/fill';
import getFile from '../../../helpers/get-file';
import { ImageContainer } from './image-container';

jest.mock('../../fill/fill');
jest.mock('../../../helpers/get-file');

const clearFile = jest.fn();
const parseFile = jest.fn();

describe('ImageContainer', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <ImageContainer
        clearFile={clearFile}
        imageType="heatmap"
        match={{
          params: {
            id: 'task1',
          },
        }}
        parseFile={parseFile}
      />,
    );
  });

  describe('on mount', () => {
    it('should call clear file', () => {
      expect(clearFile).toHaveBeenCalled();
    });

    it('should call get file', () => {
      const options = {
        err: wrapper.instance().getError,
        responseType: 'json',
      };
      expect(getFile).toHaveBeenCalledWith('task/task1', options, wrapper.instance().onLoad);
    });
  });

  describe('prop change', () => {
    let spy;

    afterAll(() => {
      spy.mockRestore();
    });

    beforeAll(() => {
      spy = jest.spyOn(wrapper.instance(), 'updateStatus');
      wrapper.update();
      wrapper.setProps({ imageType: 'scatter' });
    });

    it('should call update status', () => {
      expect(spy).toHaveBeenCalledWith('scatter', 'heatmap');
    });
  });

  describe('on loading image', () => {
    describe('with image name', () => {
      const json = {
        parameters: { name: 'testname' },
      };

      beforeAll(() => {
        fillJson.mockClear();
        parseFile.mockClear();
        wrapper.instance().onLoad(json);
      });

      it('should call fill json', () => {
        expect(fillJson).toHaveBeenCalledWith('testname', json);
      });

      it('should call parse file ', () => {
        expect(parseFile).toHaveBeenCalled();
      });
    });

    describe('with no image name', () => {
      const json = {
        parameters: { imageType: 'heatmap' },
      };

      beforeAll(() => {
        fillJson.mockClear();
        parseFile.mockClear();
        wrapper.instance().onLoad(json);
      });

      it('should call fill json', () => {
        expect(fillJson).toHaveBeenCalledWith('heatmap', json);
      });

      it('should call parse file ', () => {
        expect(parseFile).toHaveBeenCalled();
      });
    });
  });

  describe('get error', () => {
    beforeAll(() => {
      wrapper.setState({
        error: false,
        loading: true,
      });
      wrapper.instance().getError();
    });

    it('should set error state to true', () => {
      expect(wrapper.state().error).toBeTruthy();
    });

    it('should set loading state to false', () => {
      expect(wrapper.state().loading).toBeFalsy();
    });
  });

  describe('get image', () => {
    describe('with image url param', () => {
      beforeAll(() => {
        getFile.mockClear();
        const match = {
          params: {
            id: 'task1',
            image: 'heatmap',
          },
        };
        wrapper.instance().getImage(match);
      });

      it('should call get file', () => {
        const options = {
          err: wrapper.instance().getError,
          responseType: 'json',
        };
        expect(getFile).toHaveBeenCalledWith('task/task1/heatmap', options, wrapper.instance().onLoad);
      });
    });

    describe('with no image url param', () => {
      beforeAll(() => {
        getFile.mockClear();
        const match = {
          params: {
            id: 'task1',
          },
        };
        wrapper.instance().getImage(match);
      });

      it('should call get file', () => {
        const options = {
          err: wrapper.instance().getError,
          responseType: 'json',
        };
        expect(getFile).toHaveBeenCalledWith('task/task1', options, wrapper.instance().onLoad);
      });
    });
  });

  describe('update status', () => {
    describe('with null image type', () => {
      beforeAll(() => {
        wrapper.setState({ error: true, loading: true });
        wrapper.instance().updateStatus(null, 'heatmap');
      });

      it('should not update error state', () => {
        expect(wrapper.state().error).toBeTruthy();
      });

      it('should not update loading state', () => {
        expect(wrapper.state().error).toBeTruthy();
      });
    });

    describe('with same image type as previous state', () => {
      beforeAll(() => {
        wrapper.setState({ error: true, loading: true });
        wrapper.instance().updateStatus('heatmap', 'heatmap');
      });

      it('should not update error state', () => {
        expect(wrapper.state().error).toBeTruthy();
      });

      it('should not update loading state', () => {
        expect(wrapper.state().error).toBeTruthy();
      });
    });

    describe('with different image type as previous state', () => {
      beforeAll(() => {
        wrapper.setState({ error: true, loading: true });
        wrapper.instance().updateStatus('scatter', 'heatmap');
      });

      it('should not update error state', () => {
        expect(wrapper.state().error).toBeFalsy();
      });

      it('should not update loading state', () => {
        expect(wrapper.state().error).toBeFalsy();
      });
    });
  });
});
