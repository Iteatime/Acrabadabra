import { TestBed } from "@angular/core/testing";

import { StoreService } from "./store.service";
import { RouterTestingModule } from "@angular/router/testing";

describe("StoreService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    })
  );

  it("should be created", () => {
    const service: StoreService = TestBed.get(StoreService);
    expect(service).toBeTruthy();
  });
});
