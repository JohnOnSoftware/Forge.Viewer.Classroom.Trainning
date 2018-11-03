AutodeskNamespace('Viewing.ClassroomTrainning')

Viewing.ClassroomTrainning.AdnPropertyPanel = function (viewer) {
  const _panel = this
  const _viewer = viewer
  const _selectedNodeId = ''

  Autodesk.Viewing.Extensions.ViewerPropertyPanel.call(
    _panel,
    _viewer)

  _panel.setNodeProperties = function (nodeId) {
    Autodesk.Viewing.Extensions.ViewerPropertyPanel.prototype.setNodeProperties.call(
      _panel,
      nodeId)

    _selectedNodeId = nodeId
  }

  _panel.setProperties = function (properties) {
    Autodesk.Viewing.Extensions.ViewerPropertyPanel.prototype.setProperties.call(
      _panel, properties);

      var insTree = _viewer.model.getInstanceTree();
      var nodeName = insTree.getNodeName(_selectedNodeId);



    $.ajax({
      url: '/db/price/'+nodeName,
      type: 'GET',
      success: function (data) {
        console.log('successfull get price: ' + data)
        _panel.addProperty(
          'Node Price', // property name
          data, // property value
          'Database Information') // group name
      }
    })
  }
}

Viewing.ClassroomTrainning.AdnPropertyPanel.prototype = Object.create(
    Autodesk.Viewing.Extensions.ViewerPropertyPanel.prototype)

Viewing.ClassroomTrainning.AdnPropertyPanel.prototype.constructor =
  Viewing.ClassroomTrainning.AdnPropertyPanel

Viewing.ClassroomTrainning.Extension = function (viewer, option) {
  Autodesk.Viewing.Extension.call(this, viewer, option)
  _viewer = viewer
  _self = this
}

Viewing.ClassroomTrainning.Extension.prototype = Object.create(Autodesk.Viewing.Extension.prototype)
Viewing.ClassroomTrainning.Extension.prototype.constructor = Viewing.ClassroomTrainning.Extension

Viewing.ClassroomTrainning.Extension.prototype.onSelectionChanged = function (e) {
  // var propertyPanel = _viewer.getPropertyPanel(true)
  // propertyPanel.setTitle('My Panel')
  // propertyPanel.addProperty('test', 'john', 'new cat', null)
  // propertyPanel.setVisible(true)
  // return false
}

Viewing.ClassroomTrainning.Extension.prototype.onGeometryLoaded = function () {
  var panel = new Viewing.ClassroomTrainning.AdnPropertyPanel(_viewer)
  _viewer.setPropertyPanel(panel)

  // Add onClick event for Model Structure Panel
  var structruePanel = _viewer.modelstructure
  structruePanel.onClick = _self.onModelStructureClick
}

Viewing.ClassroomTrainning.Extension.prototype.onModelStructureClick = function (node, e) {
  var propertyPanel = _viewer.getPropertyPanel(true)
  if (propertyPanel && propertyPanel.isVisible()) {
    propertyPanel.setNodeProperties(node)
  }
}

Viewing.ClassroomTrainning.Extension.prototype.onToolbarCreated = function (e) {
  console.log('toolbar created event is called')
  _viewer.removeEventListener(Autodesk.Viewing.TOOLBAR_CREATED_EVENT, _self.onToolbarCreated)
  _self.createMyUI()
}

Viewing.ClassroomTrainning.Extension.prototype.createMyUI = function () {
  console.log('create UI')
  // Button 1
  var button1 = new Autodesk.Viewing.UI.Button('my-view-front-button')
  button1.icon.style.backgroundImage = 'url(../img/frontview.png)'

  button1.onClick = function (e) {
    _viewer.setViewCube('front')
  }
  button1.addClass('my-view-front-button')
  button1.setToolTip('View front')

  // Button 2
  var button2 = new Autodesk.Viewing.UI.Button('my-view-back-button')
  button2.icon.style.backgroundImage = 'url(../img/backview.png)'
  button2.onClick = function (e) {
    _viewer.setViewCube('back')
  }
  button2.addClass('my-view-back-button')
  button2.setToolTip('View Back')

  // SubToolbar
  this.subToolbar = new Autodesk.Viewing.UI.ControlGroup('my-custom-view-toolbar')
  this.subToolbar.addControl(button1)
  this.subToolbar.addControl(button2)

  // Add button to toolbar
  _viewer.toolbar.addControl(this.subToolbar)

  // remove settings button from toolbar
  var group = _viewer.toolbar.getControl('settingsTools')
  group.removeControl('toolbar-settingsTool')

  // reposition the default control
  var op = {
    index: 0
  }
  var fullscreenBtn = group.getControl('toolbar-fullscreenTool')
  group.removeControl('toolbar-fullscreenTool')
  group.addControl(fullscreenBtn, op)
}

Viewing.ClassroomTrainning.Extension.prototype.load = () => {
  // Add selection Changed event to include more properties.
  _viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, _self.onSelectionChanged)

  _viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, _self.onGeometryLoaded)

  if (_viewer.toolbar && false) {
    _self.createMyUI()
  }else {
    _viewer.addEventListener(Autodesk.Viewing.TOOLBAR_CREATED_EVENT, _self.onToolbarCreated)
    console.log('Events are registered')
  }

  console.log('My extension is loaded')
  return true
}

Viewing.ClassroomTrainning.Extension.prototype.unload = () => {
  console.log('My extension is unloaded')
  _viewer.removeEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, _self.onGeometryLoaded)

  _viewer.removeEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, _self.onSelectionChanged)
  _viewer.toolbar.removeControl(_self.subToolbar)
  return true
}

Autodesk.Viewing.theExtensionManager.registerExtension(
  'MyExtension', Viewing.ClassroomTrainning.Extension)
