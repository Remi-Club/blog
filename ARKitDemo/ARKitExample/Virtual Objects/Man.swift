//
//  Man.swift
//  ARKitExample
//
//  Created by 刘梦迪 on 2017/7/5.
//  Copyright © 2017年 Apple. All rights reserved.
//

import Foundation

class Man: VirtualObject {
    
    override init() {
        super.init(modelName: "man", fileExtension: "dae", thumbImageFilename: "vase", title: "Man")
        //        super.init(modelName: "vase", fileExtension: "scn", thumbImageFilename: "vase", title: "Vase")
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
