describe('qmate in ts environment', () => {
  it('should run qmate commands', async () => {
    expect(non_ui5).toBeTruthy();
    expect(ui5).toBeTruthy();
    expect(utilities).toBeTruthy();
  });
});

