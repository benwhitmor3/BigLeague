import {Instance} from "mobx-state-tree"
import {PlayerTypeModelBase} from "./PlayerTypeModel.base"

/* The TypeScript type of an instance of PlayerTypeModel */
export interface PlayerTypeModelType extends Instance<typeof PlayerTypeModel.Type> {
}

/* A graphql query fragment builders for PlayerTypeModel */
export {selectFromPlayerType, playerTypeModelPrimitives, PlayerTypeModelSelector} from "./PlayerTypeModel.base"

/**
 * PlayerTypeModel
 */
export const PlayerTypeModel = PlayerTypeModelBase
    .actions(self => ({
        // This is an auto-generated example action.
        log() {
            console.log(JSON.stringify(self))
        }
    }))
    .views((self) => ({
        get overallValue() {
            const ageWeight = 0.2;
            const pvWeight = 0.8;
            // @ts-ignore (age and pv should always be present)
            return ageWeight * (30 - self.age) + pvWeight * self.pv;
        }
    }));
