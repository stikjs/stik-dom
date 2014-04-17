describe('$dom', function(){
  describe("hasClass", function(){
    it("whithout the class", function(){
      var elm = document.createElement("div");

      var hasClassHelper = stik.labs.dom({
        name: "hasClass"
      }).run();

      expect(hasClassHelper(elm, "active")).toBeFalsy();
    });

    it("with the class", function(){
      var elm = document.createElement("div");
      elm.className = "active";

      var hasClassHelper = stik.labs.dom({
        name: "hasClass"
      }).run();

      expect(hasClassHelper(elm, "active")).toBeTruthy();
    });

    it("with a different class", function(){
      var elm = document.createElement("div");
      elm.className = "not-active";

      var hasClassHelper = stik.labs.dom({
        name: "hasClass"
      }).run();

      expect(hasClassHelper(elm, "active")).toBeFalsy();
    });
  });

  describe("addClass", function(){
    it("whithout the class", function(){
      var elm = document.createElement("div");

      var addClassHelper = stik.labs.dom({
        name: "addClass"
      }).run();

      addClassHelper(elm, "active");

      expect(elm.className).toEqual("active");
    });

    it("with the class", function(){
      var elm = document.createElement("div");
      elm.className = "active";

      var addClassHelper = stik.labs.dom({
        name: "addClass"
      }).run();

      addClassHelper(elm, "active");

      expect(elm.className).toEqual("active");
    });

    it("with a different class", function(){
      var elm = document.createElement("div");
      elm.className = "not-active";

      var addClassHelper = stik.labs.dom({
        name: "addClass"
      }).run();

      addClassHelper(elm, "active");

      expect(elm.className).toEqual("not-active active");
    });
  });

  describe("removeClass", function(){
    it("whithout the class", function(){
      var elm = document.createElement("div");

      var removeClassHelper = stik.labs.dom({
        name: "removeClass"
      }).run();

      expect(function(){
        removeClassHelper(elm, "active");
      }).not.toThrow();
    });

    it("with the class", function(){
      var elm = document.createElement("div");
      elm.className = "active";

      var removeClassHelper = stik.labs.dom({
        name: "removeClass"
      }).run();

      removeClassHelper(elm, "active");

      expect(elm.className).toEqual("");
    });

    it("with a different class", function(){
      var elm = document.createElement("div");
      elm.className = "not-active";

      var removeClassHelper = stik.labs.dom({
        name: "removeClass"
      }).run();

      removeClassHelper(elm, "active");

      expect(elm.className).toEqual("not-active");
    });
  });

  describe("toggleClass", function(){
    it("whithout the class", function(){
      var elm = document.createElement("div");

      var toggleClassHelper = stik.labs.dom({
        name: "toggleClass"
      }).run();

      toggleClassHelper(elm, "active");

      expect(elm.className).toEqual("active");
    });

    it("with the class", function(){
      var elm = document.createElement("div");
      elm.className = "active";

      var toggleClassHelper = stik.labs.dom({
        name: "toggleClass"
      }).run();

      toggleClassHelper(elm, "active");

      expect(elm.className).toEqual("");
    });

    it("with a different class", function(){
      var elm = document.createElement("div");
      elm.className = "not-active";

      var toggleClassHelper = stik.labs.dom({
        name: "toggleClass"
      }).run();

      toggleClassHelper(elm, "active");

      expect(elm.className).toEqual("not-active active");
    });
  });

  describe("hide", function(){
    it("when visible", function(){
      var elm = document.createElement("div");

      var hideHelper = stik.labs.dom({
        name: "hide"
      }).run();

      hideHelper(elm);

      expect(elm.style.display).toEqual("none");
    });
  });

  describe("show", function(){
    it("when visible", function(){
      var elm = document.createElement("div");

      var showHelper = stik.labs.dom({
        name: "show"
      }).run();

      showHelper(elm);

      expect(elm.style.display).toEqual("");
    });

    it("when hidden should remove the property", function(){
      var elm = document.createElement("div");
      elm.style.display = "none";

      var showHelper = stik.labs.dom({
        name: "show"
      }).run();

      showHelper(elm);

      expect(elm.style.display).toEqual("");
    });
  });

  describe("remove", function(){
    it("should remove a child from its parent", function(){
      var template = document.createElement("div");
      template.innerHTML = '<span></span>';

      var removeHelper = stik.labs.dom({
        name: "remove"
      }).run();

      removeHelper(template.firstChild);

      expect(template.childNodes.length).toEqual(0);
    });
  });

  describe("parse", function(){
    it("should parse a string as a node element", function(){
      var template = "<span></span>";

      var parse = stik.labs.dom({
        name: "parse"
      }).run();

      var parsedTemplate = parse(template);

      expect(parsedTemplate instanceof HTMLElement).toBeTruthy();
    });
  });

  describe("append", function(){
    it("with a non empty parent", function(){
      var template = document.createElement("div");
      template.innerHTML = "<span></span>";
      var newNode = document.createElement("div");

      var appendHelper = stik.labs.dom({
        name: "append"
      }).run();

      appendHelper(template, newNode);

      expect(template.childNodes.length).toEqual(2);
      expect(template.lastChild.nodeName).toEqual("DIV");
    });

    it("with an empty parent", function(){
      var template = document.createElement("div");
      var newNode = document.createElement("div");

      var appendHelper = stik.labs.dom({
        name: "append"
      }).run();

      appendHelper(template, newNode);

      expect(template.childNodes.length).toEqual(1);
      expect(template.firstChild.nodeName).toEqual("DIV");
    });

    it("with a string child", function(){
      var template = document.createElement("div");
      var newNode = "<span></span>";

      var appendHelper = stik.labs.dom({
        name: "append"
      }).run();

      appendHelper(template, newNode);

      expect(template.childNodes.length).toEqual(1);
      expect(template.firstChild.nodeName).toEqual("SPAN");
    });

    it("with multiple childs as string", function(){
      var template = document.createElement("div");
      var newNodes = "<span></span><br><a>";

      var appendHelper = stik.labs.dom({
        name: "append"
      }).run();

      appendHelper(template, newNodes);

      expect(template.childNodes.length).toEqual(3);
      expect(template.childNodes[0].nodeName).toEqual("SPAN");
      expect(template.childNodes[1].nodeName).toEqual("BR");
      expect(template.childNodes[2].nodeName).toEqual("A");
    });
  });

  describe("prepend", function(){
    it("with a non empty parent", function(){
      var template = document.createElement("div");
      template.innerHTML = "<span></span>";
      var newNode = document.createElement("div");

      var prependHelper = stik.labs.dom({
        name: "prepend"
      }).run();

      prependHelper(template, newNode);

      expect(template.childNodes.length).toEqual(2);
      expect(template.firstChild.nodeName).toEqual("DIV");
    });

    it("with an empty parent", function(){
      var template = document.createElement("div");
      var newNode = document.createElement("div");

      var prependHelper = stik.labs.dom({
        name: "prepend"
      }).run();

      prependHelper(template, newNode);

      expect(template.childNodes.length).toEqual(1);
      expect(template.firstChild.nodeName).toEqual("DIV");
    });

    it("with a string child", function(){
      var template = document.createElement("div");
      var newNode = "<span></span>";

      var appendHelper = stik.labs.dom({
        name: "prepend"
      }).run();

      appendHelper(template, newNode);

      expect(template.childNodes.length).toEqual(1);
      expect(template.firstChild.nodeName).toEqual("SPAN");
    });

    it("with multiple childs as string", function(){
      var template = document.createElement("div");
      var newNodes = "<span></span><br><a>";

      var appendHelper = stik.labs.dom({
        name: "prepend"
      }).run();

      appendHelper(template, newNodes);

      expect(template.childNodes.length).toEqual(3);
      expect(template.childNodes[0].nodeName).toEqual("SPAN");
      expect(template.childNodes[1].nodeName).toEqual("BR");
      expect(template.childNodes[2].nodeName).toEqual("A");
    });
  });

  describe("insertAfter", function(){
    it("with a non empty parent", function(){
      var template = document.createElement("div");
      template.innerHTML = "<span></span><br>";
      var newNode = document.createElement("div");

      var insertAfterHelper = stik.labs.dom({
        name: "insertAfter"
      }).run();

      insertAfterHelper(template.firstChild, newNode);

      expect(template.childNodes.length).toEqual(3);
      expect(template.childNodes[1].nodeName).toEqual("DIV");
    });

    it("with a string child", function(){
      var template = document.createElement("div");
      template.innerHTML = "<span></span><br>";
      var newNode = "<div>/div>";

      var insertAfterHelper = stik.labs.dom({
        name: "insertAfter"
      }).run();

      insertAfterHelper(template.firstChild, newNode);

      expect(template.childNodes.length).toEqual(3);
      expect(template.childNodes[1].nodeName).toEqual("DIV");
    });
  });

  describe("insertBefore", function(){
    it("with a non empty parent", function(){
      var template = document.createElement("div");
      template.innerHTML = "<span></span><br>";
      var newNode = document.createElement("div");

      var insertBeforeHelper = stik.labs.dom({
        name: "insertBefore"
      }).run();

      insertBeforeHelper(template.firstChild, newNode);

      expect(template.childNodes.length).toEqual(3);
      expect(template.firstChild.nodeName).toEqual("DIV");
    });

    it("with a string child", function(){
      var template = document.createElement("div");
      template.innerHTML = "<span></span><br>";
      var newNode = "<div></div>";

      var insertBeforeHelper = stik.labs.dom({
        name: "insertBefore"
      }).run();

      insertBeforeHelper(template.firstChild, newNode);

      expect(template.childNodes.length).toEqual(3);
      expect(template.firstChild.nodeName).toEqual("DIV");
    });
  });
});
