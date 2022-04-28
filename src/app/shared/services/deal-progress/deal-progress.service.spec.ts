import { CDK_DESCRIBEDBY_HOST_ATTRIBUTE } from '@angular/cdk/a11y';
import { TestBed } from '@angular/core/testing';

import { DealProgressService } from './deal-progress.service';

describe('DealProgressService', () => {
  let service: DealProgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DealProgressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe("#set()",()=>{
    it("should append a customerId and process array to completed processes list",()=>{
      service.completedProcesses = {};

      service.set("test")

      expect(service.completedProcesses["test"]).toEqual([{processId:1}]);
    })
  })

  describe("#addNewCompletion()",()=>{
    it("should add new process to an already existing list and should call #generateEmptyArray",()=>{
      spyOn(service, "generateEmptyArray");

      service.completedProcesses = {test:[{processId:1}]};

      service.addNewCompletion("test",{processId:2})

      expect(service.completedProcesses["test"]).toEqual([{processId:1},{processId:2}]);
      expect(service.generateEmptyArray).toHaveBeenCalledWith("test")
    })
  })

  describe("#removeProcess()",()=>{
    it("should remove all instance of a process from an already existing list and should call #generateEmptyArray",()=>{
      spyOn(service, "generateEmptyArray");

      service.completedProcesses = {test:[{processId:1},{processId:2},{processId:2}]};

      service.removeProcess("test",{processId:2})

      expect(service.completedProcesses["test"]).toEqual([{processId:1}]);
      expect(service.generateEmptyArray).toHaveBeenCalledWith("test")
    })
  })

  describe("#getCompletions()",()=>{
    it("should return all processes from an already existing list and should call #generateEmptyArray",()=>{
      spyOn(service, "generateEmptyArray");

      service.completedProcesses = {test:[{processId:1},{processId:2},{processId:2}]};

      service.getCompletions("test")

      expect(service.completedProcesses["test"]).toEqual([{processId:1},{processId:2},{processId:2}]);
      expect(service.generateEmptyArray).toHaveBeenCalledWith("test")
    })
  })

  describe("#generateEmptyArray()",()=>{
    it("should create an empty array when the customer id is undefined",()=>{
      service.completedProcesses = {};

      service.generateEmptyArray("test1")

      expect(service.completedProcesses["test1"]).toEqual([]);
    })
  })


});
