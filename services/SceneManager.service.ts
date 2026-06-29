class SceneManager {
  constructor(private store: any, private canvas: any) {}

  renderLayers() {
    const layers = this.store.getState().layers;

    layers.forEach((layer) => {
      const objects = layer.elementIds.map((id) =>
        this.canvas.getObjectById(id)
      );

      objects.forEach((obj) => {
        if (!obj) return;

        // VISIBILITY
        obj.visible = layer.visible;

        // ALTITUDE / Z INDEX
        obj.position.z = layer.altitude;

        // OPACITY
        if (obj.material) {
          obj.material.opacity = layer.opacity ?? 1;
          obj.material.transparent = true;
        }
      });
    });

    this.canvas.render();
  }
  applyGroups() {
  const groups = this.store.getState().groups;

  groups.forEach((group) => {
    group.elementIds.forEach((id) => {
      const obj = this.canvas.getObjectById(id);
      if (!obj) return;

      obj.visible = group.visible;
    });
  });
}

addGuide(orientation, value) {
  if (orientation === "horizontal") {
    this.canvas.drawLine(0, value, "horizontal");
  }

  if (orientation === "vertical") {
    this.canvas.drawLine(value, 0, "vertical");
  }
}
}
