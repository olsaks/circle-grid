class App {
  static init() {
    //  dynamicaly created circles with appropriate classnames,
    // but couldnt get event listeners on them working in time...

    // const target = document.querySelector(".circle-grid");
    // for (var i = 0; i < 10; i++) {
    //   var row = document.createElement("div");
    //   row.classList.add("row");
    //   for (var j = 0; j < 10; j++) {
    //     var container = document.createElement("div");
    //     container.classList.add("container");
    //     if (j <= i) {
    //       container.classList.add("active");
    //       var circle = document.createElement("div");
    //       circle.classList.add("circle");
    //       if (i === 0) {
    //         circle.classList.add("wobble");
    //       }
    //       container.append(circle);
    //     }
    //     row.append(container);
    //   }
    //   target.append(row);
    // }

    // get all circle elements and give them appropriate event listeners
    App.circles = [...document.getElementsByClassName("circle")];
    for (App.circle of App.circles) {
      App.circle.addEventListener("dragstart", App.dragstart);
      App.circle.addEventListener("dragend", App.dragend);
    }

    // get all container elements and give them appropriate event listeners
    App.containers = [...document.getElementsByClassName("container")];
    for (const container of App.containers) {
      container.addEventListener("dragover", App.dragover);
      container.addEventListener("dragenter", App.dragenter);
      container.addEventListener("dragleave", App.dragleave);
      container.addEventListener("drop", App.drop);
    }

    App.dragged;
  }

  static dragstart() {
    setTimeout(() => (this.className = "invisible"), 0); // hide circle you have just dragged
    App.dragged = this; // set this circle to our dragged element so we can append this later
    for (const container of App.containers) {
      container.classList.add("visible"); // show white circle containers where user can place circle
    }
  }

  static dragend() {
    this.className = "circle"; // reassign cirle class to element to give circle styles
    for (const container of App.containers) {
      container.classList.remove("visible"); // hide all containers since circle will be giving style
    }
    App.dragged = undefined; // set the dragged element back to initial state
  }

  static dragover(e) {
    e.preventDefault(); // need to prevent default behavior so drop function actually works
  }

  static dragenter(e) {
    e.preventDefault(); // need to prevent default behavior so drop function actually works
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
