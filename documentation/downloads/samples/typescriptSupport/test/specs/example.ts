describe('qmate in ts environment', () => {
  it('should run qmate commands', async () => {
    expect(nonUi5).toBeTruthy();
    expect(ui5).toBeTruthy();
    expect(util).toBeTruthy();
    expect(service).toBeTruthy();
    expect(common).toBeTruthy();
  });
});

