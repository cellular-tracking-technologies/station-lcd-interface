module.exports = Menu = {

    Item: class {
        constructor(name, callback){
    
            /**@public */
            this.parent = null;
    
            /**@public */
            this.callback = callback;
    
            /**@public */
            this.name = name;        
    
            /**@private */
            this.children_ = [];        
        }
        addChild(child){
            this.children_.push(child);
        }
        childCount(){
            return this.children_.length;
        }
        getChild(exact_name){
            return this.children_.filter((child) => {
                exact_name == child.name;
            });
        }
    },
    setRelation: function(parent, child) {
        if(parent instanceof this.Item == false){
            throw TypeError;
        }else if(parent instanceof this.Item == false){
            throw TypeError;
        }
    
        parent.addChild(child);
        child.parent = parent;
    },
    childrenNames(parent){
        if(parent instanceof this.Item == false){
            throw TypeError;
        }

        let names = []
        parent.children_.forEach(child => {
            names.push(child.name);
        });

        return names
    }
}




