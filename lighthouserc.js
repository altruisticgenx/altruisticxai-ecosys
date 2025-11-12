module.exports = {
  ci: {
    collect: {
      url: [
        "http://localhost:4173/"
      ],
      startServerCommand: "npm run build && npm run preview",
      numberOfRuns: 3,
      settings: {
        emulatedFormFactor: "desktop"
      }
    },
    upload: {
      target: "temporary-public-storage"
    }
  }
};
