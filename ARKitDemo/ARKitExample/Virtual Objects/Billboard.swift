//
//  billboard.swift
//  ARKitExample
//
//  Created by 刘梦迪 on 2017/7/4.
//  Copyright © 2017年 Apple. All rights reserved.
//


import Foundation

class Billboard: VirtualObject {
    
    override init() {
        super.init(modelName: "billboard", fileExtension: "dae", thumbImageFilename: "vase", title: "Billboard")
//        super.init(modelName: "vase", fileExtension: "scn", thumbImageFilename: "vase", title: "Vase")
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}

