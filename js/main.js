class App {
  static init() {
    // const target = document.getElementById("circle-grid");
    // console.log(target);

    // for (var i = 1; i < 11; i++) {
    //   var row = document.createElement("div");
    //   row.classList.add("row");
    //   target.append(row);
    //   for (var j = 1; j < 11; j++) {
    //     var container = document.createElement("div");
    //     container.classList.add("container");
    //     row.append(container);
    //     for (var k = 1; k < j + 1; k++) {
    //       container.classList.add("active");
    //       var circle = document.createElement("div");
    //       circle.classList.add("circle");
    //       container.append(circle);
    //     }
    //   }
    // }

    App.circles = document.getElementsByClassName("circle");

    for (App.circle of App.circles) {
      App.circle.addEventListener("dragstart", App.dragstart);
      App.circle.addEventListener("touchstart", App.dragstart);
      App.circle.addEventListener("dragend", App.dragend);
      App.circle.addEventListener("touchend", App.dragend);
    }

    App.dragged;

    App.containers = document.getElementsByClassName("container");
    // console.log([...containers]);

    for (const container of App.containers) {
      container.addEventListener("dragover", App.dragover);
      container.addEventListener("dragenter", App.dragenter);
      container.addEventListener("dragleave", App.dragleave);
      container.addEventListener("drop", App.drop);
    }
  }

  static dragstart() {
    setTimeout(() => (this.className = "invisible"), 0);
    App.dragged = this;
    for (const container of App.containers) {
      container.classList.add("visible");
    }
  }

  static dragend() {
    this.className = "circle";
    for (const container of App.containers) {
      container.classList.remove("visible");
    }
    App.dragged = undefined;
  }

  static dragover(e) {
    e.preventDefault();
  }

  static dragenter(e) {
    e.preventDefault();
    this.classList.add("hovered"); //add hover state if circle is being dragged
  }

  static dragleave() {
    this.classList.remove("hovered"); //remove hover state if circle is being dragged
  }

  static drop() {
    //ensuring user cannot drop circle back into original container, nor an already active container
    if (
      this !== App.dragged.parentElement &&
      !this.classList.contains("active")
    ) {
      this.className = "container active";
      App.dragged.parentElement.className = "container inactive"; //set initial container of dragged circle to inactive
      this.append(App.dragged); //append dragged cirle to current item
      for (const container of App.containers) {
        container.classList.remove("visible"); //hide inactive circles
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", App.init);
