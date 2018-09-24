import React from 'react';
import { shallow } from 'enzyme';

import download from '../../../../helpers/download';
import getFile from '../../../../helpers/get-file';
import sessionState from '../../../session/session-state';
import { SaveContainer } from './panel__save-container';

jest.mock('../../../../helpers/get-file');
jest.mock('../../../../helpers/download');
jest.mock('../../../session/session-state');
sessionState.mockReturnValue({});

const saveError = jest.fn();
const saveImageType = jest.fn();
const saveSessionName = jest.fn();

describe('Panel save container', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <SaveContainer
        save={{
          didSave: false,
          error: false,
          imageType: 'svg',
          isSaving: false,
          name: '',
          task: '',
        }}
        saveError={saveError}
        saveImage={jest.fn()}
        saveImageType={saveImageType}
        saveSessionBrowser={jest.fn()}
        saveSessionName={saveSessionName}
        storageSupport
      />,
    );
  });

  describe('when props change should call download image method', () => {
    let spy;

    beforeAll(() => {
      spy = jest.spyOn(wrapper.instance(), 'downloadImage');
      wrapper.update();
    });

    afterAll(() => {
      spy.mockRestore();
    });

    it('should ', () => {
      expect(spy).not.toHaveBeenCalled();
      wrapper.setProps();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('download image', () => {
    beforeAll(() => {
      getFile.mockClear();
    });

    it('should not download when save prop is false', () => {
      const prevSave = {
        didSave: false,
        error: false,
        imageType: 'svg',
        isSaving: false,
        name: '',
        task: '',
      };
      const save = {
        didSave: false,
        error: false,
        imageType: 'svg',
        isSaving: false,
        name: '',
        task: '',
      };
      wrapper.instance().downloadImage(save, prevSave);
      expect(getFile).not.toHaveBeenCalled();
    });

    it('should not download when save state is true but so is previous', () => {
      const prevSave = {
        didSave: true,
        error: false,
        imageType: 'svg',
        isSaving: false,
        name: '',
        task: '',
      };
      const save = {
        didSave: true,
        error: false,
        imageType: 'svg',
        isSaving: false,
        name: '',
        task: '',
      };
      wrapper.instance().downloadImage(save, prevSave);
      expect(getFile).not.toHaveBeenCalled();
    });

    it('should not download when there is no task id/folder', () => {
      const prevSave = {
        didSave: false,
        error: false,
        imageType: 'svg',
        isSaving: false,
        name: '',
        task: '',
      };
      const save = {
        didSave: true,
        error: false,
        imageType: 'svg',
        isSaving: false,
        name: '',
        task: '',
      };
      wrapper.instance().downloadImage(save, prevSave);
      expect(getFile).not.toHaveBeenCalled();
    });

    it('should download when save complete and there is a task id/folder', () => {
      const prevSave = {
        didSave: false,
        error: false,
        imageType: 'svg',
        isSaving: false,
        name: '',
        task: '',
      };
      const save = {
        didSave: true,
        error: false,
        imageType: 'svg',
        isSaving: false,
        name: '',
        task: 'task',
      };
      wrapper.setProps({
        save,
      });
      wrapper.instance().downloadImage(save, prevSave);
      const options = {
        err: saveError,
        ext: 'svg',
        name: 'image',
      };
      expect(getFile).toHaveBeenCalledWith('file/task', options);
    });
  });

  it('should save unnamed session to file', () => {
    download.mockClear();
    wrapper.instance().saveSessionFile();
    expect(download).toHaveBeenCalledWith('{}', 'prohits-viz-session.json', 'application/json');
  });

  it('should save named session to file', () => {
    download.mockClear();
    wrapper.setProps({
      save: {
        error: false,
        imageType: 'svg',
        isSaving: false,
        name: 'named session',
      },
    });
    wrapper.instance().saveSessionFile();
    expect(download).toHaveBeenCalledWith('{}', 'named session.json', 'application/json');
  });

  it('should save session name', () => {
    saveSessionName.mockClear();
    wrapper.instance().saveSessionName({ target: { value: 'test' } });
    expect(saveSessionName).toHaveBeenCalledWith('test');
  });
});
